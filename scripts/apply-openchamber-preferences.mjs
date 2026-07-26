#!/usr/bin/env node

import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const preferencesPath = path.join(
  scriptDir,
  "..",
  ".config",
  "openchamber",
  "preferences.json",
)
const settingsPath = path.join(
  os.homedir(),
  ".config",
  "openchamber",
  "settings.json",
)

if (!fs.existsSync(settingsPath)) {
  console.error("OpenChamber settings not found. Start OpenChamber once, then run this command again.")
  process.exit(1)
}

const preferences = JSON.parse(fs.readFileSync(preferencesPath, "utf8"))
const settings = JSON.parse(fs.readFileSync(settingsPath, "utf8"))
const temporaryPath = `${settingsPath}.dotfiles-${process.pid}.tmp`

fs.writeFileSync(
  temporaryPath,
  `${JSON.stringify({ ...settings, ...preferences }, null, 2)}\n`,
  { mode: fs.statSync(settingsPath).mode },
)
fs.renameSync(temporaryPath, settingsPath)

console.log("Applied portable OpenChamber preferences.")
