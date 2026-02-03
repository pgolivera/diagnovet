import { Helmet } from "react-helmet-async";
import { SEO_CONFIG } from "../../../constants";

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  keywords?: string;
}

function SEO({
  title = SEO_CONFIG.defaultTitle,
  description = SEO_CONFIG.defaultDescription,
  canonicalUrl,
  ogImage = SEO_CONFIG.defaultImage,
  ogType = "website",
  twitterCard = "summary_large_image",
  keywords = SEO_CONFIG.defaultKeywords,
}: SEOProps) {
  const fullTitle = title === SEO_CONFIG.defaultTitle ? title : `${title} | ${SEO_CONFIG.siteName}`;

  const url = canonicalUrl || SEO_CONFIG.baseUrl;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}

export default SEO;
