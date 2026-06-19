---
title: Running Inference
section: Core Concepts
order: 3
---

## Basic Inference

The simplest inference call:

```typescript
const result = await client.inference.run({
  model: 'gpt-4o',
  messages: [
    { role: 'user', content: 'What is the capital of France?' }
  ],
});
```

## Streaming Responses

For long-form outputs, use streaming to receive tokens as they are generated:

```typescript
const stream = await client.inference.stream({
  model: 'claude-3-5-sonnet',
  messages: [{ role: 'user', content: 'Write a haiku about distributed systems.' }],
});

for await (const chunk of stream) {
  process.stdout.write(chunk.delta);
}
```

## Generation Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `temperature` | `number (0–2)` | Randomness. 0 is deterministic. |
| `maxTokens` | `number` | Maximum tokens to generate. |
| `topP` | `number (0–1)` | Nucleus sampling threshold. |
| `stopSequences` | `string[]` | Stop generation at these tokens. |
| `seed` | `number` | For reproducible outputs. |

## Structured Output

Enforce a JSON schema on the response:

```typescript
const result = await client.inference.run({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Extract the person name and age.' }],
  responseFormat: {
    type: 'json_schema',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' },
      },
      required: ['name', 'age'],
    },
  },
});

const data = JSON.parse(result.text);
```
