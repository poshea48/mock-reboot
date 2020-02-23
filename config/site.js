module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
  title: 'NFL/Fantasy Football Mock Draft', // Navigation and Site Title
  titleAlt: 'MockDraft', // Title for JSONLD
  description: 'Mock NFL Fantasy Football Draft',
  // url: '', // Domain of your site. No trailing slash!
  // siteUrl: '', // url + pathPrefix
  siteLanguage: 'en', // Language Tag on <html> element
  // logo: 'static/logo/logo.png', // Used for SEO
  // banner: 'static/logo/banner.png',
  // // JSONLD / Manifest
  favicon: 'src/images/footballPic.png',
  icons: [
    {
      src: '/static/images/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/static/images/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
  shortName: 'MockDraft', // shortname for manifest. MUST be shorter than 12 characters
  // eslint-disable-next-line quotes
  author: "Paul O'Shea", // Author for schemaORGJSONLD
  themeColor: '#3e7bf2',
  backgroundColor: '#d3e0ff',
  twitter: '@Paul91865115', // Twitter Username
};
