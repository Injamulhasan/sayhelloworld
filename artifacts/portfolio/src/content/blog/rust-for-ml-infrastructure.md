---
title: Why I Rewrote Our Data Pipeline in Rust
pubDate: 2025-06-18
description: Python is great for ML research. It is a poor choice for high-throughput data infrastructure. Here is what we learned switching to Rust.
tags: [Rust, Systems, Data Engineering]
readingTime: 10 min read
---

I have nothing against Python. I write it every day. But when we needed a data processing pipeline that could handle 50GB/s of streaming feature data with sub-millisecond p99 latency, Python was the wrong tool.

## The Original System

Our feature computation pipeline was pure Python — Pandas, some NumPy, wrapped in a Kafka consumer. It was easy to build, easy to understand, and topped out at about 4GB/s on a beefy machine. The GIL, reference counting overhead, and the general cost of Python's dynamism added up.

We tried PyPy, we tried Cython, we tried moving hot paths to C extensions. Each helped incrementally. None solved the fundamental problem.

## Why Rust

The options for high-performance data processing without Python overhead: C++, Rust, Go, or Java/JVM.

Go has excellent concurrency primitives but lacks the zero-cost abstractions we needed for tight SIMD loops. C++ would work but the memory safety guarantees of Rust mattered for a pipeline that runs 24/7. Java brings GC pauses at exactly the wrong moments.

Rust gave us:
- Zero-cost abstractions over SIMD operations
- Fearless concurrency with threads and async I/O
- No garbage collector pauses
- Excellent interop with our existing Python models via PyO3

## The Rewrite

We didn't rewrite everything at once. We identified the hot path — parsing incoming Protobuf messages, computing rolling aggregations, writing to our feature store — and rewrote that first.

```rust
#[derive(Debug)]
pub struct FeatureAggregator {
    windows: Vec<TimeWindow>,
    store: Arc<FeatureStore>,
}

impl FeatureAggregator {
    pub async fn process_batch(
        &self,
        events: &[Event],
    ) -> Result<Vec<FeatureVector>, AggregatorError> {
        let futures: Vec<_> = events
            .iter()
            .map(|e| self.compute_features(e))
            .collect();
        
        join_all(futures).await.into_iter().collect()
    }
}
```

## Results

Processing throughput went from 4GB/s to 47GB/s on equivalent hardware. p99 latency dropped from ~40ms to ~0.8ms.

The team's Rust onboarding took about 6-8 weeks to feel productive. The borrow checker is genuinely difficult at first. Three months in, people stopped fighting it and started using it as a design tool.

Whether this trade-off makes sense depends entirely on your constraints. For us, the performance requirements made it obvious in retrospect.
