---
title: Quickstart
section: Getting Started
order: 1
---

## Installation

Install the package using your preferred package manager:

```bash
npm install @yourname/toolkit
# or
pnpm add @yourname/toolkit
```

## Basic Usage

```typescript
import { createClient } from '@yourname/toolkit';

const client = createClient({
  apiKey: process.env.API_KEY,
  baseUrl: 'https://api.example.com',
});

const result = await client.inference.run({
  model: 'gpt-4o-mini',
  prompt: 'Explain transformer attention in one paragraph.',
});

console.log(result.text);
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | `string` | — | Required. Your API key. |
| `baseUrl` | `string` | `https://api.example.com` | API base URL. |
| `timeout` | `number` | `30000` | Request timeout in milliseconds. |
| `retries` | `number` | `3` | Number of automatic retries on failure. |

## Next Steps

- Read the [Authentication guide](/docs/authentication) to understand API key scopes.
- Explore [Inference options](/docs/inference) for advanced model configuration.
- Check the [Deployment guide](/docs/deployment) to take this to production.
