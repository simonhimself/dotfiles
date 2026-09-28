import { readFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import { Plugin } from "@opencode/plugin"

const REPLICATE_API_BASE = "https://api.replicate.com/v1"

// The background OpenCode service doesn't inherit shell env vars, so fall back to
// the git-ignored secrets file used by the other keys in this config.
const TOKEN_FILE = join(homedir(), ".config/opencode/secrets/replicate-api-token")

function getApiToken(): string {
  const envToken = process.env.REPLICATE_API_TOKEN
  if (envToken) return envToken
  try {
    const fileToken = readFileSync(TOKEN_FILE, "utf8").trim()
    if (fileToken) return fileToken
  } catch {}
  throw new Error(
    `Replicate API token not found. Set REPLICATE_API_TOKEN or create ${TOKEN_FILE}.`,
  )
}

function authHeaders(apiToken: string): Record<string, string> {
  return {
    Authorization: `Bearer ${apiToken}`,
    "Content-Type": "application/json",
  }
}

// Rejects early when the session is stopped so polling loops exit promptly.
function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(signal.reason)
    const timer = setTimeout(resolve, ms)
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer)
        reject(signal.reason)
      },
      { once: true },
    )
  })
}

function text(content: string) {
  return { content }
}

// ── Type definitions ──────────────────────────────────────

interface SearchModelResult {
  model: {
    url: string
    owner: string
    name: string
    description: string
    run_count: number
    cover_image_url?: string
    latest_version?: { id: string }
  }
  metadata: {
    tags?: string[]
    generated_description?: string
  }
}

interface ModelDetail {
  is_official?: boolean
  created_at?: string
}

interface SearchResponse {
  models: SearchModelResult[]
  collections?: Array<{ name: string; slug: string; description: string }>
}

interface ModelResponse {
  owner: string
  name: string
  description: string
  latest_version?: {
    id: string
    openapi_schema?: {
      components?: {
        schemas?: {
          Input?: { properties?: Record<string, unknown> }
          Output?: unknown
        }
      }
    }
  }
}

interface PredictionResponse {
  id: string
  status: string
  output: unknown
  error: string | null
  logs: string | null
  metrics?: { predict_time?: number }
  urls?: { get?: string; web?: string }
}

// ── Plugin ────────────────────────────────────────────────

export default Plugin.define({
  id: "replicate",
  async setup(ctx) {
    await ctx.tool.transform((editor) => {
      // ── replicate_search ──────────────────────────────
      editor.add({
        name: "replicate_search",
        description:
          "Search for models on Replicate. Returns model names, descriptions, run counts, " +
          "official status, and tags. Use this to find models for image generation, text " +
          "generation, audio, video, etc.",
        input: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description:
                "Search query (e.g. 'image generation', 'lip sync', 'text to speech')",
            },
          },
          required: ["query"],
          additionalProperties: false,
        },
        async execute(input, { signal }) {
          const { query } = input as { query: string }
          const apiToken = getApiToken()
          const url = `${REPLICATE_API_BASE}/search?query=${encodeURIComponent(query)}`
          const response = await fetch(url, { headers: authHeaders(apiToken), signal })

          if (!response.ok) {
            const error = await response.text()
            return text(`ERROR: Search failed (${response.status}): ${error}`)
          }

          const data = (await response.json()) as SearchResponse
          if (!data.models?.length) {
            return text("No models found.")
          }

          // Enrich results with official status and creation date
          const details = await Promise.all(
            data.models.map(async (r): Promise<ModelDetail> => {
              const res = await fetch(
                `${REPLICATE_API_BASE}/models/${r.model.owner}/${r.model.name}`,
                { headers: authHeaders(apiToken), signal },
              )
              if (!res.ok) return {}
              const d = (await res.json()) as {
                is_official?: boolean
                created_at?: string
              }
              return { is_official: d.is_official, created_at: d.created_at }
            }),
          )

          const lines = data.models.map((r, i) => {
            const m = r.model
            const d = details[i]
            const created = d.created_at
              ? ` (created ${d.created_at.slice(0, 10)})`
              : ""
            const official = d.is_official ? " [official]" : ""
            const parts = [
              `**${m.owner}/${m.name}** -- ${m.run_count.toLocaleString()} runs${created}${official}`,
              m.description ? `  ${m.description}` : null,
              r.metadata.tags?.length
                ? `  Tags: ${r.metadata.tags.join(", ")}`
                : null,
              r.metadata.generated_description
                ? `  ${r.metadata.generated_description}`
                : null,
            ]
            return parts.filter(Boolean).join("\n")
          })

          let result = lines.join("\n\n")

          if (data.collections?.length) {
            result += "\n\n---\n**Related collections:**\n"
            result += data.collections
              .map(
                (c) =>
                  `- [${c.name}](https://replicate.com/collections/${c.slug}): ${c.description}`,
              )
              .join("\n")
          }

          return text(result)
        },
      })

      // ── replicate_schema ──────────────────────────────
      editor.add({
        name: "replicate_schema",
        description:
          "Get the input/output schema for a Replicate model. Use this before running a " +
          "model to understand what inputs it accepts and what it returns.",
        input: {
          type: "object",
          properties: {
            model: {
              type: "string",
              description:
                "Model identifier in 'owner/name' format (e.g. 'black-forest-labs/flux-schnell')",
            },
          },
          required: ["model"],
          additionalProperties: false,
        },
        async execute(input, { signal }) {
          const { model } = input as { model: string }
          const apiToken = getApiToken()
          const url = `${REPLICATE_API_BASE}/models/${model}`
          const response = await fetch(url, { headers: authHeaders(apiToken), signal })

          if (!response.ok) {
            const error = await response.text()
            return text(`ERROR: Failed to get model (${response.status}): ${error}`)
          }

          const data = (await response.json()) as ModelResponse
          const parts = [`# ${data.owner}/${data.name}`, data.description]

          if (data.latest_version?.id) {
            parts.push(`\nLatest version: \`${data.latest_version.id}\``)
            parts.push(
              `Run as: \`${data.owner}/${data.name}:${data.latest_version.id}\``,
            )
          }

          const schema =
            data.latest_version?.openapi_schema?.components?.schemas
          if (schema?.Input?.properties) {
            parts.push(
              "\n## Input schema\n```json\n" +
                JSON.stringify(schema.Input.properties, null, 2) +
                "\n```",
            )
          }
          if (schema?.Output) {
            parts.push(
              "\n## Output schema\n```json\n" +
                JSON.stringify(schema.Output, null, 2) +
                "\n```",
            )
          }

          return text(parts.join("\n"))
        },
      })

      // ── replicate_run ─────────────────────────────────
      editor.add({
        name: "replicate_run",
        description:
          "Run a model on Replicate. Tries sync mode (up to 60s wait). If the model isn't " +
          "done yet, polls every 2 seconds until completion, collecting logs along the way. " +
          "For official models use 'owner/name'. For community models use " +
          "'owner/name:version_id'. Use replicate_schema first to understand the model's inputs.",
        input: {
          type: "object",
          properties: {
            model: {
              type: "string",
              description:
                "Model identifier. Official: 'owner/name' (e.g. 'black-forest-labs/flux-schnell'). " +
                "Community: 'owner/name:version_id'.",
            },
            input: {
              type: "object",
              description: "Model input parameters as a JSON object",
              additionalProperties: true,
            },
          },
          required: ["model", "input"],
          additionalProperties: false,
        },
        async execute(input, { signal }) {
          const { model, input: modelInput } = input as {
            model: string
            input: Record<string, unknown>
          }
          const apiToken = getApiToken()
          const hasVersion = model.includes(":")

          const url = hasVersion
            ? `${REPLICATE_API_BASE}/predictions`
            : `${REPLICATE_API_BASE}/models/${model}/predictions`
          const body = hasVersion
            ? { version: model.split(":")[1], input: modelInput }
            : { input: modelInput }

          const response = await fetch(url, {
            method: "POST",
            headers: {
              ...authHeaders(apiToken),
              Prefer: "wait=60",
            },
            body: JSON.stringify(body),
            signal,
          })

          if (!response.ok) {
            const error = await response.text()
            return text(`ERROR: Prediction failed (${response.status}): ${error}`)
          }

          let prediction = (await response.json()) as PredictionResponse
          const predictionUrl = `https://replicate.com/p/${prediction.id}`

          if (prediction.status === "failed") {
            return text(`ERROR: Prediction ${prediction.id} failed: ${prediction.error}\n\n${predictionUrl}`)
          }

          if (prediction.status === "succeeded") {
            const time = prediction.metrics?.predict_time
            const timeStr = time ? ` (${time.toFixed(2)}s)` : ""
            return text(
              `Prediction ${prediction.id} succeeded${timeStr}.\n\n${predictionUrl}\n\n` +
              `Output:\n${JSON.stringify(prediction.output, null, 2)}`
            )
          }

          // Poll until complete
          let allLogs = prediction.logs || ""
          const getUrl =
            prediction.urls?.get ??
            `${REPLICATE_API_BASE}/predictions/${prediction.id}`

          while (
            prediction.status !== "succeeded" &&
            prediction.status !== "failed" &&
            prediction.status !== "canceled"
          ) {
            await sleep(2000, signal)

            const pollRes = await fetch(getUrl, {
              headers: authHeaders(apiToken),
              signal,
            })
            if (!pollRes.ok) {
              const error = await pollRes.text()
              return text(`ERROR: Failed to poll prediction (${pollRes.status}): ${error}`)
            }

            prediction = (await pollRes.json()) as PredictionResponse

            if (prediction.logs && prediction.logs.length > allLogs.length) {
              allLogs = prediction.logs
            }
          }

          if (prediction.status === "failed") {
            return text(
              `ERROR: Prediction ${prediction.id} failed: ${prediction.error}\n\n${predictionUrl}` +
              (allLogs ? `\n\nLogs:\n${allLogs}` : "")
            )
          }

          if (prediction.status === "canceled") {
            return text(`Prediction ${prediction.id} was canceled.\n\n${predictionUrl}`)
          }

          const time = prediction.metrics?.predict_time
          const timeStr = time ? ` (${time.toFixed(2)}s)` : ""
          return text(
            `Prediction ${prediction.id} succeeded${timeStr}.\n\n${predictionUrl}\n\n` +
            `Output:\n${JSON.stringify(prediction.output, null, 2)}` +
            (allLogs ? `\n\nLogs:\n${allLogs}` : "")
          )
        },
      })

      // ── replicate_whoami ──────────────────────────────
      editor.add({
        name: "replicate_whoami",
        description:
          "Get the Replicate username for the currently authenticated user.",
        input: {
          type: "object",
          additionalProperties: false,
        },
        async execute(_input, { signal }) {
          const apiToken = getApiToken()
          const res = await fetch(`${REPLICATE_API_BASE}/account`, {
            headers: authHeaders(apiToken),
            signal,
          })
          if (!res.ok) {
            const error = await res.text()
            return text(`ERROR: Failed to get account info (${res.status}): ${error}`)
          }
          const data = (await res.json()) as {
            type: string
            username: string
            name: string
          }
          return text(`Logged in as: ${data.username} (${data.name}, type: ${data.type})`)
        },
      })
    })
  },
})
