import SiteJsonLd from '@/core/components/web/seo/SiteJsonLd';

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteJsonLd />
      {children}
    </>
  );
}
