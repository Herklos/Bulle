/**
 * Canonical URL + locale helpers for the marketing site.
 *
 * Every marketing page's canonical and hreflang set comes from `localizedSeo()`, so the two
 * can never drift apart — a canonical that disagrees with its hreflang alternates is the
 * classic way to split ranking signals across locales.
 */

export const BASE_URL = 'https://bulle.drakkar.software';

export type MarketingLang = 'fr' | 'en';

/** Anything we don't ship falls back to FR, the launch market and design language. */
export function normalizeLang(lang: string | undefined): MarketingLang {
  return lang === 'en' ? 'en' : 'fr';
}

/** "/" → "/fr"; "/blog" → "/fr/blog". Every marketing URL carries its locale. */
export function localizedPath(lang: MarketingLang, path: string): string {
  const clean = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `/${lang}${clean}`;
}

export function localizedUrl(lang: MarketingLang, path: string): string {
  return `${BASE_URL}${localizedPath(lang, path)}`;
}

/** Spread straight into <Seo>: canonical + both alternates, always consistent. */
export function localizedSeo(lang: MarketingLang, path: string) {
  return {
    canonical: localizedUrl(lang, path),
    alternates: {
      fr: localizedUrl('fr', path),
      en: localizedUrl('en', path),
    },
  };
}

/** For the language switcher: swap the leading locale segment, keep everything else. */
export function swapLocaleInPath(pathname: string, lang: MarketingLang): string {
  if (/^\/(fr|en)(?=\/|$)/.test(pathname)) {
    return pathname.replace(/^\/(fr|en)/, `/${lang}`);
  }
  return localizedPath(lang, pathname);
}
