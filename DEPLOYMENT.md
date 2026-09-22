# Cloudflare Pages deployment

Before the production deployment, replace every exact occurrence of:

`[FINAL_CUSTOM_DOMAIN]`

with the purchased domain only, without a protocol or trailing slash. For example, replacing it with `example.com` turns `https://[FINAL_CUSTOM_DOMAIN]/blogs.html` into `https://example.com/blogs.html`.

The placeholder appears only in canonical URLs, Open Graph URLs and images, JSON-LD URLs, `robots.txt`, and `sitemap.xml`. After replacement, search the entire deployment folder for `[FINAL_CUSTOM_DOMAIN]`; the result must be empty.

Cloudflare Pages should publish this directory as the site root. No build command is required.
