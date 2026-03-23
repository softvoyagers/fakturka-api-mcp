// @ts-nocheck
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

const API_BASE = process.env.FAKTUJ_API_URL || 'https://faktuj.pl';

export function createMcpServer(): McpServer {
  const server = new McpServer({
    name: 'faktuj-mcp',
    version: '1.3.0',
  });

  server.tool(
    'generate_invoice',
    'Generate a Polish VAT invoice PDF. Pass the full invoice JSON (with sprzedawca, nabywca, pozycje, etc.) as a string. Returns invoice number and base64-encoded PDF.',
    {
      data: z.string().describe('Invoice JSON string with sprzedawca (seller), nabywca (buyer), pozycje (line items), and other invoice fields'),
    },
    async ({ data }) => {
      const body = JSON.parse(data);
      body.metadata = true;
      const response = await fetch(`${API_BASE}/api/v1/invoice/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
        isError: !response.ok,
      };
    }
  );

  server.tool(
    'generate_proforma',
    'Generate a Polish proforma invoice PDF. Pass the full invoice JSON (with sprzedawca, nabywca, pozycje, etc.) as a string. Returns invoice number and base64-encoded PDF.',
    {
      data: z.string().describe('Proforma invoice JSON string with sprzedawca (seller), nabywca (buyer), pozycje (line items), and other invoice fields'),
    },
    async ({ data }) => {
      const body = JSON.parse(data);
      body.metadata = true;
      const response = await fetch(`${API_BASE}/api/v1/invoice/proforma`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
        isError: !response.ok,
      };
    }
  );

  server.tool(
    'preview_invoice',
    'Preview and validate invoice data without generating a PDF. Pass the full invoice JSON as a string. Returns validated invoice data or validation errors.',
    {
      data: z.string().describe('Invoice JSON string to validate (same schema as generate_invoice)'),
    },
    async ({ data }) => {
      const body = JSON.parse(data);
      const response = await fetch(`${API_BASE}/api/v1/invoice/preview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
        isError: !response.ok,
      };
    }
  );

  server.tool(
    'lookup_nip',
    'Look up a Polish company by NIP tax identification number. Returns company name, address, and registration data.',
    {
      nip: z.string().describe('Polish NIP tax number (10 digits, with or without dashes)'),
    },
    async ({ nip }) => {
      const response = await fetch(`${API_BASE}/api/v1/nip/${encodeURIComponent(nip)}`);
      const result = await response.json();
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
        isError: !response.ok,
      };
    }
  );

  server.tool(
    'lookup_nbp_rate',
    'Look up the NBP (National Bank of Poland) exchange rate for a given currency and date.',
    {
      currency: z.string().describe('ISO 4217 currency code (e.g. EUR, USD, GBP)'),
      date: z.string().describe('Date in YYYY-MM-DD format'),
    },
    async ({ currency, date }) => {
      const response = await fetch(`${API_BASE}/api/v1/nbp/${encodeURIComponent(currency)}/${encodeURIComponent(date)}`);
      const result = await response.json();
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
        isError: !response.ok,
      };
    }
  );

  server.tool(
    'validate_iban',
    'Validate an IBAN (International Bank Account Number). Returns validation result and bank details if valid.',
    {
      iban: z.string().describe('IBAN number to validate (e.g. PL61109010140000071219812874)'),
    },
    async ({ iban }) => {
      const response = await fetch(`${API_BASE}/api/v1/iban/${encodeURIComponent(iban)}`);
      const result = await response.json();
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
        isError: !response.ok,
      };
    }
  );

  return server;
}
