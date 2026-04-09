# Faktuj MCP Server

[![npm version](https://img.shields.io/npm/v/faktuj-mcp)](https://www.npmjs.com/package/faktuj-mcp)
[![Website](https://img.shields.io/badge/website-faktuj.pl-ff00aa)](https://faktuj.pl)
[![API Status](https://img.shields.io/badge/API-online-39ff14)](https://faktuj.pl/health)

Integrate **[Faktuj](https://faktuj.pl)** into Claude, Cursor, VS Code, and any MCP-compatible AI assistant. Generate [VAT invoices](https://faktuj.pl/faktura-vat) and [proforma invoices](https://faktuj.pl/faktura-proforma), look up companies by NIP, check NBP exchange rates, and validate IBAN numbers — all from your AI workflow. Fully aligned with [KSeF compliance](https://faktuj.pl/ksef) requirements.

No API key required. Free forever.

## Quick Start

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "faktuj": {
      "command": "npx",
      "args": ["-y", "faktuj-mcp"]
    }
  }
}
```

Or install globally:

```bash
npm install -g faktuj-mcp
```

Then add to your config:

```json
{
  "mcpServers": {
    "faktuj": {
      "command": "faktuj-mcp"
    }
  }
}
```

## Available Tools

| Tool | Description |
|------|-------------|
| `generate_invoice` | Generate a Polish [VAT invoice](https://faktuj.pl/faktura-vat) PDF. Pass full invoice JSON with seller, buyer, and line items. Returns invoice number and base64 PDF. |
| `generate_proforma` | Generate a [proforma invoice](https://faktuj.pl/faktura-proforma) PDF. Same schema as VAT invoice. Returns invoice number and base64 PDF. |
| `preview_invoice` | Preview and validate invoice data without generating a PDF. Returns validated data or validation errors. |
| `lookup_nip` | Look up a Polish company by NIP tax identification number. Returns company name, address, and registration data. |
| `lookup_nbp_rate` | Look up NBP (National Bank of Poland) exchange rate for a given currency and date. |
| `validate_iban` | Validate an IBAN number. Returns validation result and bank details if valid. |

## Example Usage

Ask your AI assistant:

- *"Generate a VAT invoice from ACME sp. z o.o. (NIP: 1234567890) to Beta S.A. for 10 hours of consulting at 200 PLN/h"*
- *"Look up the company with NIP 5263442510"*
- *"What was the EUR/PLN exchange rate on 2026-03-20?"*
- *"Validate IBAN PL61109010140000071219812874"*

## Architecture

```
AI Assistant <--stdio--> faktuj-mcp <--HTTPS--> faktuj.pl REST API
```

This is a thin stdio MCP transport layer over the [Faktuj REST API](https://faktuj.pl/docs). The MCP server translates tool calls into HTTP requests and returns structured responses.

## Configuration

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `FAKTUJ_API_URL` | `https://faktuj.pl` | Base URL for the Faktuj API |

## Resources

- [VAT Invoice Guide](https://faktuj.pl/faktura-vat) — How to create a compliant Polish VAT invoice
- [Proforma Invoice Guide](https://faktuj.pl/faktura-proforma) — When and how to use proforma invoices
- [KSeF Compliance](https://faktuj.pl/ksef) — Poland's National e-Invoicing System requirements
- [Blog](https://faktuj.pl/blog) — Invoicing guides, tax tips, and product updates
- [API Documentation](https://faktuj.pl/docs) — Full REST API reference

## SoftVoyagers Ecosystem

Faktuj is part of the [SoftVoyagers](https://github.com/softvoyagers) open-source portfolio:

| Product | Description | Website |
|---------|-------------|---------|
| **LinkMeta** | Free URL metadata extraction API | [linkmeta.dev](https://linkmeta.dev) |
| **PageShot** | Free screenshot & webpage capture API | [pageshot.site](https://pageshot.site) |
| **PDFSpark** | Free HTML/URL to PDF conversion API | [pdfspark.dev](https://pdfspark.dev) |
| **OGForge** | Free Open Graph image generator API | [ogforge.dev](https://ogforge.dev) |
| **LinkShrink** | Free privacy-first URL shortener API | [linkshrink.dev](https://linkshrink.dev) |
| **Faktuj** | Free Polish VAT invoice generator | [faktuj.pl](https://faktuj.pl) |
| **QRMint** | Free styled QR code generator & API | [qrmint.dev](https://qrmint.dev) |
| **PageDrop** | Free instant HTML hosting API | [pagedrop.dev](https://pagedrop.dev) |
| **PismoSzyteNaMiarę** | Darmowy generator pism urzędowych | [pismoszytenamiare.pl](https://pismoszytenamiare.pl) |

## License

MIT
