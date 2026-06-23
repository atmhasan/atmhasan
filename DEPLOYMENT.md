# Deployment Instructions

This project is ready to deploy to GitHub Pages with the custom domain `atmhasan.com`.

## What Is Already Set Up

- `public/CNAME` is configured for `atmhasan.com`.
- Vite is using a root base path (`/`), which is correct for a custom domain on GitHub Pages.
- The site is built as a static app, so it can be published from the generated `dist` folder.

## GitHub Repository Setup

1. Push the `main` branch to `https://github.com/atmhasan/atmhasan`.
2. In **Settings > Pages**, set **Build and deployment > Source** to **GitHub Actions**.
3. Under **Custom domain**, enter `atmhasan.com` and click **Save** before changing DNS.
4. If the repository is private, make sure GitHub Pages is allowed for the account or plan.

## DNS Setup for `atmhasan.com`

Create these records at the DNS provider (remove conflicting records for the same host):

| Type | Name | Value |
| --- | --- | --- |
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |
| `CNAME` | `www` | `atmhasan.github.io` |

GitHub also supports the four `AAAA` records documented in its custom-domain guide, but the `A` records above are sufficient. Do not use wildcard DNS records such as `*.atmhasan.com`.

After DNS updates, allow up to 24 hours for propagation. Then return to **Settings > Pages**, confirm the DNS check succeeds, and enable **Enforce HTTPS**. GitHub recommends verifying `atmhasan.com` in the account's Pages settings as an additional takeover-protection step.

## Deploy Flow

The GitHub Actions workflow will:

1. Install dependencies.
2. Run the production build.
3. Upload the `dist` directory as a Pages artifact.
4. Deploy the artifact to GitHub Pages.

## Local Verification Before Deploying

Run these commands from the repository root:

```bash
npm ci
npm run lint
npm run build
npm run preview -- --host 127.0.0.1
```

## Post-Deployment Checks

- Confirm the homepage loads at `https://atmhasan.com`.
- Confirm `https://www.atmhasan.com` redirects to the apex domain.
- Confirm the CV download link points to the renamed PDF in `public/documents`.
- Check the certificate gallery, mobile header, and sticky navigation on real devices.
- Confirm the custom domain and **Enforce HTTPS** are enabled in **Settings > Pages**.
- Submit `https://atmhasan.com/sitemap.xml` in Google Search Console after verifying the domain property.
- Use URL Inspection in Search Console to request indexing for `https://atmhasan.com/`.

## Cache Behavior

GitHub Pages controls response cache headers and commonly serves HTML and static files with short edge caching. Vite already hashes JavaScript and CSS asset filenames. JSON content fetches include a build-version query string so each deployment requests fresh content such as `/data/site.json?v=<build-version>` and avoids stale portfolio data after release.

## If the Site Does Not Load Correctly

- Confirm the GitHub Pages source is set to **GitHub Actions**.
- Confirm the DNS records are correct and have propagated.
- Confirm the workflow completed successfully and produced a `dist` artifact.
- Confirm there are no broken asset paths in `public/data` or `public/images`.
