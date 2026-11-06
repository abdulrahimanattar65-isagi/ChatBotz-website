# ChatBotz Marketing Website

Standalone marketing site (React + Vite + Tailwind CSS + Framer Motion + React Router).
It is fully separate from the ChatBotz SaaS app: it only links to it.

## Setup
```
npm install
cp .env.example .env     # then edit the URLs
npm run dev
npm run build            # output in dist/
```

## Configure
`.env`: `VITE_LOGIN_URL`, `VITE_SIGNUP_URL` (your SaaS login/register pages), `VITE_SITE_URL`, `VITE_CONTACT_EMAIL`.
Edit copy, plans and prices in `src/data/content.js` (paid plans show "Contact us" until you set `price`).
Replace `www.example.com` in `public/sitemap.xml` and `public/robots.txt`.

## Deploy
Host `dist/` on any static host. Add a rewrite of all routes to `index.html` (SPA routing).
