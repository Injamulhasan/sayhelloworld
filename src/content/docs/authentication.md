---
title: Authentication
section: Getting Started
order: 2
---

## API Keys

All requests must include an API key in the `Authorization` header:

```
Authorization: Bearer sk-your-api-key-here
```

API keys are scoped. A key generated for `inference` cannot be used to access `admin` endpoints.

## Key Scopes

| Scope | Description |
|-------|-------------|
| `inference:read` | Run inference requests |
| `models:read` | List and describe available models |
| `admin:write` | Manage keys and settings (restricted) |

## Rotating Keys

Keys can be rotated via the dashboard or the API:

```bash
curl -X POST https://api.example.com/v1/keys/rotate \
  -H "Authorization: Bearer sk-admin-key" \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key_abc123"}'
```

The old key remains valid for 24 hours after rotation to allow graceful migration.

## Security Best Practices

- Never commit API keys to version control. Use environment variables.
- Set the minimum scope required for each key.
- Rotate keys every 90 days, or immediately on suspected compromise.
- Use separate keys for development, staging, and production.
