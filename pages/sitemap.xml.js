import { SitemapStream, streamToPromise } from 'sitemap';

const Sitemap = () => null;

export const getServerSideProps = async ({ res }) => {
  // List of your routes
  const routes = [
    '/',
    // Add more routes as needed
  ];

  const sitemap = new SitemapStream({ hostname: 'https://www.goonline.site' });

  // Add each route to the sitemap
  routes.forEach(route => {
    sitemap.write({ url: route, changefreq: 'daily', priority: 0.7 });
  });

  sitemap.end();

  const xml = await streamToPromise(sitemap).then(data => data.toString());

  // Set the response header and send the sitemap
  res.setHeader('Content-Type', 'application/xml');
  res.write(xml);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap; 