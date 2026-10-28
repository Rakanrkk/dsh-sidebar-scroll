// 用法：npm run build；生成 DSH 原生模块工厂与生命周期托管的样式。
import { build } from 'esbuild'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const root = fileURLToPath(new URL('.', import.meta.url))
const metadata = JSON.parse(await readFile(new URL('./package.json', import.meta.url), 'utf8'))
const result = await build({
  absWorkingDir: root,
  entryPoints: ['src/client/index.ts'],
  bundle: true,
  write: false,
  outfile: 'lib/client.js',
  format: 'cjs',
  platform: 'browser',
  target: 'chrome130',
  jsx: 'automatic',
  external: ['react', 'react/jsx-runtime', '@deepseek-ai/*'],
  loader: {'.css': 'local-css'},
  define: {
    'process.env.DSH_CLIENT_VERSION': JSON.stringify(metadata.engines.dsh),
    'process.env.DSH_CLIENT_COMMIT_HASH': 'undefined',
    'process.env.DSH_CLIENT_GIT_DIRTY': 'undefined',
  },
  legalComments: 'inline',
  metafile: true,
})
const javascript = result.outputFiles.find(file => file.path.endsWith('.js')).text
const css = result.outputFiles.find(file => file.path.endsWith('.css')).text
const code = `window.__ModuleLoader__.load({
  id: ${JSON.stringify(metadata.name)},
  factory(require) {
    const module = {exports: {}};
    const exports = module.exports;
${javascript}
    const sidebar = module.exports;
    return {
      inject: sidebar.inject,
      apply(ctx) {
        ctx.effect(() => {
          const style = document.createElement('style');
          style.dataset.plugin = ${JSON.stringify(metadata.name)};
          style.textContent = ${JSON.stringify(css)};
          document.head.appendChild(style);
          return () => style.remove();
        }, 'sidebar-scroll: styles');
        sidebar.apply(ctx);
      }
    };
  }
});
`
await mkdir(resolve(root, 'lib'), {recursive: true})
await writeFile(resolve(root, 'lib/client.js'), code)
console.log(JSON.stringify({package: metadata.name, version: metadata.version, javascriptBytes: Buffer.byteLength(code), cssBytes: Buffer.byteLength(css)}))
