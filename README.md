# Cloud

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_BRAND_NAME` | Brand name displayed across the site (header, metadata, CTA, schema) |
| `NEXT_PUBLIC_COMPANY_NAME` | Legal/company name displayed in the footer |
| `NEXT_PUBLIC_COMPANY_LINK` | Optional URL for the company name in the footer copyright (shows as a link with hover underline) |
| `NEXT_PUBLIC_HEADER_LOGIN_URL` | URL for the login button in the header |
| `NEXT_PUBLIC_DOCS_URL` | URL for the documentation link |
| `NEXT_PUBLIC_UPTIME_SLA` | Uptime SLA value shown in IT Solutions stats (e.g. `99.99%`); set to `0` to hide |
| `NEXT_PUBLIC_CLIENTS_COUNT` | Number of clients shown in IT Solutions stats (number value); set to `0` to hide |
| `NEXT_PUBLIC_NETWORK_SPEED` | Network speed value shown in IT Solutions stats in Gbit/s (number value); set to `0` to hide |
| `NEXT_PUBLIC_CONSULTATION_EMAILS` | Comma-separated Email(s) for connection consultation contact block |
| `NEXT_PUBLIC_CONSULTATION_PHONES` | Comma-separated Phone(s) for connection consultation contact block |
| `NEXT_PUBLIC_SUPPORT_EMAILS` | Comma-separated Email(s) for technical support contact block |
| `NEXT_PUBLIC_SUPPORT_PHONES` | Comma-separated Phone(s) for technical support contact block |
| `NEXT_PUBLIC_SOCIAL_LINKS` | Comma-separated social media URLs |
| `FORMSPREE_FORM_ID` | Formspree form ID for the contact form (runtime variable) |
| `GA_DATASTREAM_ID` | Google Analytics 4 Measurement ID (e.g. `G-XXXXXXXXXX`). If set, GA is loaded; if unset, no analytics script is included. (runtime variable) |

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

## Legal Documents

Place PDF files in `public/docs/`.

### Required documents

Always displayed in the footer. Must be present:

| File | Description |
|---|---|
| `pravila-ispolzovaniya.pdf` | Website Usage Policy |
| `cookie-policy.pdf` | Cookie Policy |
| `privacy-policy.pdf` | Personal Data Processing Policy |
| `data-processing.pdf` | Personal Data Processing Notice |

### Optional documents

Displayed in the footer only if the corresponding file exists in `public/docs/`:

| File | Description |
|---|---|
| `price.pdf` | Price List |
| `public-contract.pdf` | Public Agreement |
| `public-contract-sla.pdf` | Service Level Agreement |
| `payment.pdf` | Payment of Services |
| `public-contract-legal.pdf` | Position of Public Agreement |

### Footer layout

- If **any optional documents exist**: footer shows two columns — required documents on the left, available optional documents on the right. On mobile, a single column is used with required documents first.
- If **no optional documents exist**: required documents are displayed in a 2-column grid (single column on mobile).

### Other locations

- **Cookie notice** — shown only when `GA_DATASTREAM_ID` is set. Contains a link to `cookie-policy.pdf` only.
- **Contact form** — two required checkboxes:
  1. Confirmation of having read `privacy-policy.pdf` and `data-processing.pdf`.
  2. Consent to personal data processing as specified in `data-processing.pdf`.

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

Using Docker Compose (recommended) - reads all variables from `.env.local` automatically:

```bash
docker compose up --build
```

Or manually - `NEXT_PUBLIC_*` variables must be passed as build args, `FORMSPREE_FORM_ID` and `GA_DATASTREAM_ID` is passed at runtime:

```bash
docker build \
  --build-arg NEXT_PUBLIC_BRAND_NAME="..." \
  --build-arg NEXT_PUBLIC_COMPANY_NAME="..." \
  --build-arg NEXT_PUBLIC_COMPANY_LINK="..." \
  --build-arg NEXT_PUBLIC_HEADER_LOGIN_URL="..." \
  --build-arg NEXT_PUBLIC_DOCS_URL="..." \
  --build-arg NEXT_PUBLIC_UPTIME_SLA="..." \
  --build-arg NEXT_PUBLIC_CLIENTS_COUNT="..." \
  --build-arg NEXT_PUBLIC_NETWORK_SPEED="..." \
  --build-arg NEXT_PUBLIC_CONSULTATION_EMAILS="..." \
  --build-arg NEXT_PUBLIC_CONSULTATION_PHONES="..." \
  --build-arg NEXT_PUBLIC_SUPPORT_EMAILS="..." \
  --build-arg NEXT_PUBLIC_SUPPORT_PHONES="..." \
  --build-arg NEXT_PUBLIC_SOCIAL_LINKS="..." \
  -t cloud-expert .

# Run with runtime env (form ID, optional GA)
docker run -p 3000:3000 -e FORMSPREE_FORM_ID="dev_form_id" -e GA_DATASTREAM_ID="G-XXXXXXXXXX" cloud-expert
docker run -p 3000:3000 -e FORMSPREE_FORM_ID="prod_form_id" -e GA_DATASTREAM_ID="G-XXXXXXXXXX" cloud-expert
```
