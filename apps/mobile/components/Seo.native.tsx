/**
 * SEO is a web concern. On native this renders nothing, so pages can use <Seo> unguarded
 * and share one component across platforms.
 */
import type { SeoProps } from './Seo.web';

export function Seo(_props: SeoProps): null {
  return null;
}

export type { SeoProps };
