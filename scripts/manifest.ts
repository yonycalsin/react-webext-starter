import fs from "fs-extra";
import type { Manifest } from "webextension-polyfill";
import chokidar from "chokidar";

import type Pkg from "../package.json";

import { port, r, log, isDev } from "./utils";

/**
 * @url https://css-tricks.com/how-to-transition-to-manifest-v3-for-chrome-extensions/#:~:text=One%20of%20the%20major%20differences,specify%20a%20single%20JavaScript%20file.
 */
async function getManifest() {
  const pkg = (await fs.readJSON(r("package.json"))) as typeof Pkg;

  const manifest: Manifest.WebExtensionManifest = {
    manifest_version: 3,
    name: pkg.displayName || pkg.name,
    version: pkg.version,
    description: pkg.description,
    background: {
      service_worker: "background.js",
    },
    action: {
      default_icon: "",
      default_popup: "popup.html",
    },
    permissions: ["activeTab"],
    host_permissions: [],
    content_security_policy: {
      extension_pages: "",
      sandbox: `script-src \'self\' http://localhost:${port}; object-src \'self\'`,
    },
  };

  return manifest;
}

async function writeManifest() {
  const content = await getManifest();

  await fs.writeJSON(r("extension/manifest.json"), content, {
    spaces: 2,
  });

  log("PRE", "The manifest.json was wrote!");
}

writeManifest();

if (isDev) {
  chokidar
    .watch([r("scripts/manifest.ts"), r("package.json")])
    .on("change", () => {
      writeManifest();
    });
}
