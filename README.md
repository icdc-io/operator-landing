# Cloud

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_COMPANY_NAME` | Company name displayed on the site |
| `NEXT_PUBLIC_HEADER_LOGIN_URL` | URL for the login button in the header |
| `NEXT_PUBLIC_DOCS_URL` | URL for the documentation link |
| `NEXT_PUBLIC_CLIENTS_COUNT` | Number of clients shown in IT Solutions stats(number value) |
| `NEXT_PUBLIC_NETWORK_SPEED` | Network speed value shown in IT Solutions stats in Gbit/s(number value) |
| `NEXT_PUBLIC_CONSULTATION_EMAILS` | Comma-separated Email(s) for connection consultation contact block |
| `NEXT_PUBLIC_CONSULTATION_PHONES` | Comma-separated Phone(s) for connection consultation contact block |
| `NEXT_PUBLIC_SUPPORT_EMAILS` | Comma-separated Email(s) for technical support contact block |
| `NEXT_PUBLIC_SUPPORT_PHONES` | Comma-separated Phone(s) for technical support contact block |
| `NEXT_PUBLIC_SOCIAL_LINKS` | Comma-separated social media URLs |
| `FORMSPREE_FORM_ID` | Formspree form ID for the contact form (server-only, no `NEXT_PUBLIC_` prefix) |

If these env vars are not defined, the corresponding UI elements will not display:

- `NEXT_PUBLIC_HEADER_LOGIN_URL`
- `NEXT_PUBLIC_DOCS_URL`
- `NEXT_PUBLIC_CONSULTATION_EMAILS`
- `NEXT_PUBLIC_CONSULTATION_PHONES`
- `NEXT_PUBLIC_SUPPORT_EMAILS`
- `NEXT_PUBLIC_SUPPORT_PHONES`
- `NEXT_PUBLIC_SOCIAL_LINKS`

## Logo

Place a `logo.png` file in `public/logo/` to use a custom logo. If not present, the default logo (`public/logo/logo.default.png`) is used automatically.

## Development

Copy `env.local.example` to `.env.local` and fill in the values.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm install
npm run build
npm run start
```

### Docker

Using Docker Compose (recommended) — reads all variables from `.env.local` automatically:

```bash
docker compose up --build
```

Or manually — `NEXT_PUBLIC_*` variables must be passed as build args since they are baked in at build time:

```bash
docker build \
  --build-arg NEXT_PUBLIC_COMPANY_NAME="..." \
  --build-arg NEXT_PUBLIC_HEADER_LOGIN_URL="..." \
  --build-arg NEXT_PUBLIC_DOCS_URL="..." \
  --build-arg NEXT_PUBLIC_CLIENTS_COUNT="..." \
  --build-arg NEXT_PUBLIC_NETWORK_SPEED="..." \
  --build-arg NEXT_PUBLIC_CONSULTATION_EMAILS="..." \
  --build-arg NEXT_PUBLIC_CONSULTATION_PHONES="..." \
  --build-arg NEXT_PUBLIC_SUPPORT_EMAILS="..." \
  --build-arg NEXT_PUBLIC_SUPPORT_PHONES="..." \
  --build-arg NEXT_PUBLIC_SOCIAL_LINKS="..." \
  -t cloud-expert .

docker run -p 3000:3000 -e FORMSPREE_FORM_ID="..." cloud-expert
```

> Note: `FORMSPREE_FORM_ID` is the only runtime variable — all `NEXT_PUBLIC_*` variables must be provided at build time.
