import { globSync } from "node:fs";
import sharp from "sharp";
import path from "node:path";
import { access, mkdir, rm } from "node:fs/promises";
import { PluginOption } from "vite";

const plugin: (webpOptions: sharp.WebpOptions) => PluginOption = (webpOptions) => {
  const generated: string[] = [];
  const cacheRoot = path.resolve(process.cwd(), ".vite-webp-cache");

  const pathExists = async (file: string): Promise<boolean> => {
    try {
      await access(file);
      return true;
    } catch {
      return false;
    }
  };

  const toWebpCachePath = (file: string): string => {
    const relative = path.relative(process.cwd(), file);
    return path.join(cacheRoot, relative).replace(/\.(jpg|jpeg|png)$/i, ".webp");
  };

  return {
    name: "convert-to-webp",
    apply: "build",
    enforce: "pre",

    buildStart: async () => {
      const files = globSync("src/**/*.{jpg,jpeg,png}");
      for (const file of files) {
        const out = toWebpCachePath(path.resolve(file));
        await mkdir(path.dirname(out), { recursive: true });
        const pathExistsInCache = await pathExists(out);
        if (!pathExistsInCache) {
          await sharp(file).webp(webpOptions).toFile(out);
          generated.push(out);
          console.log(`✓ ${path.basename(file)} → webp`);
        }
      }
    },

    resolveId: async function (source, importer) {
      if (/\.(jpg|jpeg|png)$/i.test(source) && importer) {
        const resolved = await this.resolve(source, importer, { skipSelf: true });
        if (!resolved?.id) return;

        const cleanId = resolved.id.split("?")[0];
        const webp = toWebpCachePath(path.resolve(cleanId));
        const isWebpPathValid = await pathExists(webp);
        if (isWebpPathValid) return webp;
      }
    },

    closeBundle: async () => {
      for (const file of generated) {
        if (await pathExists(file)) {
          await rm(file, { force: true });
          console.log(`🗑 ${path.basename(file)} supprimé`);
        }
      }

      const doesPathExist = await pathExists(cacheRoot);
      if (doesPathExist) {
        await rm(cacheRoot, { recursive: true, force: true });
      }
    },
  };
};

export default plugin;
