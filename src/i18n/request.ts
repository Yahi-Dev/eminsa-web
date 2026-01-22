import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

const SUPPORTED = ['en', 'es'] as const;
type Locale = (typeof SUPPORTED)[number];
const isSupported = (l?: string): l is Locale =>
  !!l && SUPPORTED.includes(l as Locale);

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;

  const hdrs = await headers();
  const accept = hdrs.get('accept-language') ?? '';
  const headerLocale = accept.split(',')[0]?.split('-')[0]?.toLowerCase();

  const locale: Locale =
    (isSupported(cookieLocale) && cookieLocale) ||
    (isSupported(headerLocale) && headerLocale) ||
    'es';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});