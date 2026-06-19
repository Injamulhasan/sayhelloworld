export interface BlogPost {
  slug: string;
  title: string;
  pubDate: string;
  description: string;
  content: string;
  tags: string[];
  readingTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "scaling-ml-inference",
    title: "Scaling ML Inference to 10k Requests per Second",
    pubDate: "Oct 12, 2023",
    description: "Lessons learned from rewriting our entire inference pipeline, shedding latency, and cutting costs by 40%.",
    content: "<h1>Scaling ML Inference</h1><p>When you transition from research to production, the bottlenecks shift. Suddenly, your model's accuracy takes a back seat to its p99 latency.</p><p>We recently undertook a significant rewrite of our inference pipeline, migrating from a monolithic Python service to a more distributed Rust-based architecture...</p>",
    tags: ["Machine Learning", "Infrastructure", "Rust"],
    readingTime: "8 min read"
  },
  {
    slug: "transformers-from-scratch",
    title: "Understanding Transformers by Building One",
    pubDate: "Aug 05, 2023",
    description: "A deep dive into attention mechanisms, positional encoding, and why these architectures dominate modern AI.",
    content: "<h1>Transformers from Scratch</h1><p>The best way to understand a complex system is to build it yourself. In this post, we'll implement a basic Transformer model using PyTorch.</p><p>We'll cover the multi-head attention mechanism, the feed-forward networks, and how everything is stitched together...</p>",
    tags: ["Deep Learning", "PyTorch", "NLP"],
    readingTime: "12 min read"
  },
  {
    slug: "the-future-of-agents",
    title: "Agentic Workflows in the Enterprise",
    pubDate: "Jan 20, 2024",
    description: "Why the next paradigm shift isn't better models, but better systems orchestrating existing models.",
    content: "<h1>Agentic Workflows</h1><p>We've reached a point where foundation models are incredibly capable. The frontier isn't just making them smarter, it's making them useful in complex, multi-step tasks.</p><p>Agentic workflows—where LLMs use tools, reason about intermediate steps, and self-correct—are beginning to show real promise in enterprise settings...</p>",
    tags: ["AI Agents", "LLMs", "Future"],
    readingTime: "6 min read"
  },
  {
    slug: "optimizing-vector-dbs",
    title: "Optimizing Vector Database Queries",
    pubDate: "May 18, 2023",
    description: "Techniques for reducing latency and improving recall in high-dimensional vector search.",
    content: "<h1>Optimizing Vector DBs</h1><p>Retrieval-Augmented Generation (RAG) relies heavily on fast, accurate vector search. But as your dataset grows, naive exact search becomes unacceptably slow.</p><p>We explore HNSW, IVF, and other approximate nearest neighbor algorithms to strike the right balance between speed and recall...</p>",
    tags: ["Databases", "Search", "RAG"],
    readingTime: "10 min read"
  },
  {
    slug: "frontend-for-ml",
    title: "Building UIs for Machine Learning Applications",
    pubDate: "Nov 30, 2023",
    description: "How to design frontend applications that gracefully handle the latency and uncertainty inherent in AI models.",
    content: "<h1>Frontend for ML</h1><p>Machine learning models take time to run, and sometimes they fail or produce unexpected results. Designing a UI around this reality is a unique challenge.</p><p>This post explores patterns for streaming responses, optimistic UI updates, and providing meaningful feedback to the user while inference is running...</p>",
    tags: ["Frontend", "React", "UX"],
    readingTime: "7 min read"
  },
  {
    slug: "demystifying-lora",
    title: "Demystifying LoRA and QLoRA",
    pubDate: "Feb 15, 2024",
    description: "A practical guide to parameter-efficient fine-tuning for large language models.",
    content: "<h1>Demystifying LoRA</h1><p>Fine-tuning a massive language model used to require a cluster of A100s. Now, you can do it on a single consumer GPU.</p><p>Low-Rank Adaptation (LoRA) and its quantized variant (QLoRA) make this possible. Here is how they work under the hood and how you can apply them to your own tasks...</p>",
    tags: ["Fine-Tuning", "LLMs", "Research"],
    readingTime: "9 min read"
  }
];
