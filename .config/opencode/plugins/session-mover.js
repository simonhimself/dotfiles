import { execFile } from "node:child_process"
import { existsSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import { Plugin } from "@opencode/plugin"

const sessionMoverBin = () =>
  process.env.OPENCODE_SESSION_MOVER_BIN ??
  join(homedir(), ".local", "bin", "opencode-session-mover")

function runSessionMover(args, directory, signal) {
  // Tool contexts identify the session but not its current directory. The plugin
  // location is the safe, loaded-project directory to use as the subprocess cwd.
  const cwd = existsSync(directory) ? directory : homedir()

  return new Promise((resolve, reject) => {
    execFile(
      sessionMoverBin(),
      args,
      {
        cwd,
        encoding: "utf8",
        maxBuffer: 10 * 1024 * 1024,
        signal,
      },
      (error, stdout, stderr) => {
        if (error) {
          reject(new Error(stderr.trim() || error.message))
          return
        }
        resolve(stdout.trim())
      },
    )
  })
}

function result(promise) {
  return promise
    .then((content) => ({ content }))
    .catch((error) => ({
      content: `Error: ${error instanceof Error ? error.message : String(error)}`,
      metadata: { error: true },
    }))
}

export default Plugin.define({
  id: "session-mover",
  async setup(ctx) {
    await ctx.tool.transform((editor) => {
      editor.add({
        name: "session_plan_move",
        description:
          "Create a read-only, offline migration plan for moving the current root session and all descendants to another directory in a registered OpenCode project. This tool never modifies opencode.db.",
        input: {
          type: "object",
          properties: {
            target: {
              type: "string",
              description: "Existing directory inside a project that has been opened in OpenCode.",
            },
          },
          required: ["target"],
          additionalProperties: false,
        },
        execute(input, context) {
          return result(
            runSessionMover(
              ["plan-move", "--session", context.sessionID, "--target", input.target, "--summary"],
              ctx.location.directory,
              context.signal,
            ),
          )
        },
      })

      editor.add({
        name: "session_plan_fix_rename",
        description:
          "Create a read-only, offline migration plan that relinks sessions after a project folder was renamed. Nested session paths are preserved. This tool never modifies opencode.db.",
        input: {
          type: "object",
          properties: {
            oldPath: { type: "string", description: "Previous project directory path." },
            newPath: { type: "string", description: "Existing replacement project directory path." },
          },
          required: ["oldPath", "newPath"],
          additionalProperties: false,
        },
        execute(input, context) {
          return result(
            runSessionMover(
              ["plan-rename", "--old", input.oldPath, "--new", input.newPath, "--summary"],
              ctx.location.directory,
              context.signal,
            ),
          )
        },
      })

      editor.add({
        name: "session_list_orphans",
        description: "List root sessions whose stored directory no longer exists. Read-only.",
        input: {
          type: "object",
          properties: {},
          additionalProperties: false,
        },
        execute(_input, context) {
          return result(runSessionMover(["orphans"], ctx.location.directory, context.signal))
        },
      })
    })
  },
})
