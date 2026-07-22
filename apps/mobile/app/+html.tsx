/**
 * The web HTML shell.
 *
 * Strict split with <Seo>: this file holds only INVARIANTS (site identity, fonts, the
 * Organization/WebSite graph). Everything per-page lives in <Seo>. Putting a title or a
 * canonical here would silently win or lose against the page's own and be maddening to
 * debug.
 *
 * `lang="fr"` is hardcoded because FR is the default; `scripts/fix-html-lang.mjs` rewrites
 * it to "en" across dist/en/ after export. Expo renders every page from this one shell, so
 * there is no per-page hook to do it properly.
 */
import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';
import { BASE_URL } from '@/lib/seo-urls';

const SITE_NAME = 'Bulle';
const DESCRIPTION =
  'L’application privée pour préparer l’arrivée de votre bébé à deux. Sans compte, sans publicité, vos données restent sur votre téléphone.';

/**
 * The stable @graph. Per-page graphs reference these by @id rather than repeating them.
 * Note the ids are used verbatim elsewhere (`PUBLISHER` in lib/blog.ts) — they must match,
 * or the graph silently splits into two disconnected Organizations.
 */
const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': `${BASE_URL}/#app`,
      name: SITE_NAME,
      description: DESCRIPTION,
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'iOS, Android, Web',
      inLanguage: ['fr', 'en'],
      publisher: { '@id': `${BASE_URL}/#organization` },
      offers: {
        '@type': 'Offer',
        price: '4.99',
        priceCurrency: 'EUR',
        category: 'One-time purchase',
      },
      featureList: [
        'Démarches administratives françaises au bon moment',
        'Préparation à deux, sans compte',
        'Valise maternité et checklists',
        'Chiffrement de bout en bout',
        'Fonctionne hors ligne',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      inLanguage: ['fr-FR', 'en-US'],
      publisher: { '@id': `${BASE_URL}/#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: SITE_NAME,
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/assets/icon.png`,
      },
    },
  ],
};

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* The browser chrome should match the app rather than fight it — which a single
            value cannot do, because it stays ivory while the page turns warm-charcoal, and
            the mismatch shows in the one place we do not control: the OS status bar above
            our own header. `media` is how a static document reads the theme, since these
            cannot come from the JS tokens. Values are color.light.bg / color.dark.bg. */}
        <meta name="theme-color" content="#FAF7F2" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1C1A17" media="(prefers-color-scheme: dark)" />
        <meta name="application-name" content={SITE_NAME} />
        <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
        <meta name="mobile-web-app-capable" content="yes" />

        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* The manifest is what makes "add to home screen" produce an app rather than a
            bookmark: name, standalone display, and the icon set. Without it the PWA icons
            in public/assets were generated and then referenced by nothing. */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/assets/favicon.png" />
        {/* iOS ignores the manifest's icons and uses this instead. */}
        <link rel="apple-touch-icon" href="/assets/icon.png" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

        {/* Non-blocking font load: preload as style, then promote to stylesheet on load, so
            text is never blocked on the network. The <noscript> covers JS-off. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Inter:wght@400;500;600&display=swap"
          // eslint-disable-next-line react/no-unknown-property
          onLoad={"this.onload=null;this.rel='stylesheet'" as never}
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Inter:wght@400;500;600&display=swap"
          />
        </noscript>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />

        {/* Scrollbars are chrome. On a phone-width viewport they are noise laid over the
            content (touch already gets an auto-hiding overlay bar from the OS), so hide them
            below the desktop breakpoint (layout.desktopBreakpoint, 1024px) and let a real
            track return on wide screens, where it aids orientation in a long page. */}
        <style
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html:
              '@media (max-width: 1023px){*{scrollbar-width:none;-ms-overflow-style:none;}*::-webkit-scrollbar{display:none;}}',
          }}
        />

        {/* Required by expo-router for web scrolling to behave. */}
        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  );
}
