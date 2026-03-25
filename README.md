# shiki-cedar-rego

TextMate grammar definitions for **Cedar** (AWS Verified Permissions) and **Rego** (Open Policy Agent) to use with [Shiki](https://shiki.style/).

## Install

```bash
npm install shiki-cedar-rego shiki
```

## Basic usage

Add `cedarRegoLangs` to your `createHighlighter` call. Optionally use the JavaScript regex engine when you want highlighting without bundling the Oniguruma WASM binary:

```ts
import { createHighlighter } from 'shiki'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import { cedarRegoLangs } from 'shiki-cedar-rego'

const highlighter = await createHighlighter({
  themes: ['github-dark'],
  langs: [...cedarRegoLangs, 'typescript'],
  engine: createJavaScriptRegexEngine({ forgiving: true }),
})

const html = highlighter.codeToHtml('permit (...);', { lang: 'cedar', theme: 'github-dark' })
```

## Helper: `createCedarRegoHighlighter`

Convenience wrapper that loads Cedar/Rego with the same engine defaults:

```ts
import { createCedarRegoHighlighter } from 'shiki-cedar-rego'

const highlighter = await createCedarRegoHighlighter({
  themes: ['github-light', 'github-dark'],
  langs: ['json'],
})
```

## Language helpers

```ts
import { isCedarRegoLang, CEDAR_REGO_LANG_IDS } from 'shiki-cedar-rego'

if (isCedarRegoLang(lang)) {
  // narrows to 'cedar' | 'rego'
}
```

If you use Streamdown, MDX, or another wrapper, implement a bridge to your highlighter API in **your** app. This package only provides the Shiki language payloads.

## Grammar sources

- Cedar: [cedar-policy/vscode-cedar](https://github.com/cedar-policy/vscode-cedar)
- Rego: [open-policy-agent/vscode-opa](https://github.com/open-policy-agent/vscode-opa)

## Development

```bash
npm install
npm run build
```

The `prepublishOnly` script builds before `npm publish`.

## License

MIT
