---
title: Building High-Throughput Inference Engines
pubDate: 2025-11-12
description: How we reduced p99 latency by 60% while tripling throughput on our LLM serving infrastructure.
tags: [ML, Systems, Performance]
readingTime: 8 min read
---

Modern ML inference is not a solved problem. While model research races forward, the engineering challenge of serving these models reliably at scale remains deeply underexplored.

## The Problem

When we first deployed our recommendation model, the architecture was straightforward: a single GPU node, a FastAPI wrapper, and some basic request queuing. It worked fine at 100 req/s. At 1,000 req/s, it collapsed.

The bottleneck wasn't compute. It was memory bandwidth, request batching, and an embarrassing amount of Python overhead.

## What We Changed

### Continuous Batching

Static batching — wait for N requests, batch them, run inference, return — is intuitive but wasteful. Requests finish at different times, leaving GPU cores idle. Continuous batching solves this by immediately filling completed request slots with new ones.

```python
class ContinuousBatcher:
    def __init__(self, max_batch_size: int, max_wait_ms: float):
        self.queue: asyncio.Queue = asyncio.Queue()
        self.max_batch = max_batch_size
        self.max_wait = max_wait_ms / 1000

    async def process(self):
        while True:
            batch = await self._collect_batch()
            results = await self._run_inference(batch)
            for req, result in zip(batch, results):
                req.future.set_result(result)
```

### KV-Cache Management

The attention mechanism requires storing key-value pairs for all previous tokens. Managing this cache efficiently — deciding what to evict, how to allocate, how to share between requests — is where most of the complexity lives.

We borrowed ideas from PagedAttention (vLLM) and implemented a block-based allocator that reduced memory fragmentation by ~40%.

## Results

| Metric | Before | After |
|--------|--------|-------|
| p50 latency | 45ms | 18ms |
| p99 latency | 210ms | 84ms |
| Throughput | 800 req/s | 2,600 req/s |
| GPU utilization | 34% | 81% |

The gains compound. Higher utilization means fewer GPUs for the same load, which directly hits infrastructure cost.

## What I Learned

Inference optimization is empirical. You instrument, you measure, you change one thing, you measure again. Intuitions about bottlenecks are almost always wrong until you have the data to confirm them.

The other lesson: read the source code of vLLM, TensorRT-LLM, and SGLang. These teams have solved problems you will encounter, and their solutions are instructive.
