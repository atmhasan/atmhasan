# Deployment Instructions

This project is ready to deploy to GitHub Pages with the custom domain `atmhasan.com`.

## What Is Already Set Up

- `public/CNAME` is configured for `atmhasan.com`.
- Vite is using a root base path (`/`), which is correct for a custom domain on GitHub Pages.
- The site is built as a static app, so it can be published from the generated `dist` folder.

## GitHub Repository Setup

1. Push the repository to GitHub.
2. In the repository settings, open **Pages**.
3. Set **Build and deployment** to **GitHub Actions**.
4. If this is a private repository, make sure GitHub Pages is allowed for the account or plan.

## DNS Setup for `atmhasan.com`

Point the domain to GitHub Pages using the DNS records recommended by GitHub:

- `A` records for the apex domain (`atmhasan.com`) pointing to GitHub Pages IP addresses.
- `CNAME` record for `www.atmhasan.com` pointing to the GitHub Pages hostname if you use a `www` alias.

After DNS updates, wait for propagation and then verify the domain in the repository Pages settings.

## Deploy Flow

The GitHub Actions workflow will:

1. Install dependencies.
2. Run the production build.
3. Upload the `dist` directory as a Pages artifact.
4. Deploy the artifact to GitHub Pages.

## Local Verification Before Deploying

Run these commands from the `newdesign` folder:

```bash
npm ci
npm run lint
npm run build
```

## Post-Deployment Checks

- Confirm the homepage loads at `https://atmhasan.com`.
- Confirm the CV download link points to the renamed PDF in `public/documents`.
- Check the certificate gallery, mobile header, and sticky navigation on real devices.
- Verify the `CNAME` file is present in the deployed site root.

## If the Site Does Not Load Correctly

- Confirm the GitHub Pages source is set to **GitHub Actions**.
- Confirm the DNS records are correct and have propagated.
- Confirm the workflow completed successfully and produced a `dist` artifact.
- Confirm there are no broken asset paths in `public/data` or `public/images`.
