---
title: Why LLM Evaluation is Harder Than It Looks
pubDate: 2025-09-05
description: Benchmarks measure the wrong things. Here is what actually matters when evaluating language models in production.
tags: [AI, Evaluation, Research]
readingTime: 6 min read
---

Every team building on LLMs eventually faces the same uncomfortable question: how do we know if this is actually better?

## The Benchmark Problem

MMLU, HellaSwag, HumanEval — these benchmarks are well-constructed and genuinely useful for comparing models along specific capability dimensions. They are also almost completely useless for predicting whether a model will work well for your specific task.

Why? Because the distribution of inputs in your production system is almost never the distribution the benchmark assumes.

## Task-Specific Evaluation

The only reliable signal is evaluation on data that looks like your actual use case. This means:

1. **Collecting representative examples** — real queries from real users, not synthetic ones
2. **Defining clear success criteria** — what does "correct" mean for your task?
3. **Building a labeled evaluation set** — painful, but unavoidable

For generation tasks where there is no single correct answer, you need either human evaluation or a model-based judge (LLM-as-judge), both of which introduce their own biases.

## What to Measure

Beyond accuracy, the metrics that matter in production:

- **Hallucination rate** — does the model fabricate facts?
- **Instruction following** — does it respect constraints (length, format, tone)?
- **Edge case handling** — what happens on adversarial or unusual inputs?
- **Consistency** — does the same input produce similar outputs across calls?
- **Cost per correct answer** — not just accuracy but accuracy per dollar

## The Practical Approach

Start with a small, high-quality evaluation set (50-100 examples), evaluate manually, and build intuitions. Then scale to automated evaluation, using your manual labels to validate that automation.

The tooling is getting better — Braintrust, LangSmith, and similar platforms make the machinery easier. The hard part remains defining what "good" means. That is always a human judgment.
