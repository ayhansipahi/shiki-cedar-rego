/**
 * Shiki TextMate grammars for Cedar (AWS Verified Permissions) and Rego (Open Policy Agent).
 *
 * Grammars sourced from:
 * - Cedar: https://github.com/cedar-policy/vscode-cedar
 * - Rego:  https://github.com/open-policy-agent/vscode-opa
 */

import {
  createHighlighter,
  type BundledLanguage,
  type BundledTheme,
  type HighlighterGeneric,
} from 'shiki'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import cedarGrammar from './cedar.tmLanguage.json'
import regoGrammar from './rego.tmLanguage.json'

export const CEDAR_REGO_LANG_IDS = ['cedar', 'rego'] as const
export type CedarRegoLangId = (typeof CEDAR_REGO_LANG_IDS)[number]

/** Language objects ready for `createHighlighter({ langs: [...cedarRegoLangs, ...] })`. */
export const cedarRegoLangs = [
  { ...cedarGrammar, name: 'cedar' as const },
  { ...regoGrammar, name: 'rego' as const },
] as const

export function isCedarRegoLang(lang: string): lang is CedarRegoLangId {
  const t = lang.trim().toLowerCase()
  return t === 'cedar' || t === 'rego'
}

export type CreateCedarRegoHighlighterOptions = {
  themes: BundledTheme[]
  /** Extra Shiki languages (bundled ids or inline grammar definitions). */
  langs?: Array<BundledLanguage | string | Record<string, unknown>>
}

/**
 * `createHighlighter` with Cedar/Rego grammars and the JavaScript regex engine
 * (`forgiving: true`), matching typical browser / no-Oniguruma setups.
 */
export async function createCedarRegoHighlighter(
  options: CreateCedarRegoHighlighterOptions,
): Promise<HighlighterGeneric<BundledLanguage, BundledTheme>> {
  const extra = options.langs ?? []
  return createHighlighter({
    themes: options.themes,
    langs: [...cedarRegoLangs, ...extra] as never[],
    engine: createJavaScriptRegexEngine({ forgiving: true }),
  })
}
