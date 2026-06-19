---
title: Deployment Guide
section: Deployment
order: 4
---

## Production Checklist

Before deploying:

- [ ] Environment variables set for all required secrets
- [ ] API key rotation policy defined
- [ ] Rate limits configured for your expected traffic
- [ ] Health check endpoint integrated into your orchestrator
- [ ] Monitoring and alerting configured

## Environment Variables

```bash
# Required
API_KEY=sk-prod-your-key-here

# Optional
API_BASE_URL=https://api.example.com
API_TIMEOUT_MS=30000
API_MAX_RETRIES=3
LOG_LEVEL=info
```

## Health Checks

The SDK exposes a health check method for use with load balancers:

```typescript
import { healthCheck } from '@yourname/toolkit/health';

// Returns { status: 'ok', latencyMs: number }
const health = await healthCheck();
```

## Docker

```dockerfile
FROM node:22-alpine

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

## Kubernetes

A minimal deployment manifest:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: inference-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: inference-service
  template:
    spec:
      containers:
        - name: app
          image: your-registry/inference-service:latest
          env:
            - name: API_KEY
              valueFrom:
                secretKeyRef:
                  name: api-secrets
                  key: api-key
          ports:
            - containerPort: 3000
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
```
