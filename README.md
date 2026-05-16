# pay.kobbex.com — marketing static site (P7.1)

Isolated **Next.js App Router** project with **`output: "export"`** → static files deployed to **`/var/www/pay.kobbex.com`**.

## Stack choice (why)

| Criterion | Next.js static export |
|-----------|-------------------------|
| **SEO** | Pre-rendered HTML + metadata API; crawlable content. |
| **Performance** | Pure static assets; long-cache `_next/static` via Nginx. |
| **Motion** | Framer Motion in client islands without blocking HTML shell. |
| **Scalability** | Add routes under `src/app/`; same build pipeline for `/developers`, `/docs` later. |
| **Docs later** | Can add MDX or a separate route group without changing merchant/admin apps. |

## Commands

```bash
cd /opt/paykobbex-landing
npm ci
npm run build          # writes ./out
sudo rsync -a --delete ./out/ /var/www/pay.kobbex.com/
sudo chown -R www-data:www-data /var/www/pay.kobbex.com
sudo nginx -t && sudo systemctl reload nginx
```

## Nginx

Only the **`server_name pay.kobbex.com`** block uses `root /var/www/pay.kobbex.com`.  
`merchant.kobbex.com` and `appadmin.kobbex.com` remain proxied to `127.0.0.1:3002` + API to `8787`.

## Rollback

```bash
sudo cp /root/kobbex.conf.backup.pre-pay-static.20260515-223207 /etc/nginx/sites-available/kobbex.conf
sudo nginx -t && sudo systemctl reload nginx
```

(Use the latest `pre-pay-static` backup filename if different.)
