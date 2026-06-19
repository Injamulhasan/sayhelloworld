export interface Doc {
  slug: string;
  title: string;
  section: string;
  order: number;
  content: string;
}

export const docs: Doc[] = [
  {
    slug: "introduction",
    title: "Introduction",
    section: "Getting Started",
    order: 1,
    content: "<h1>Introduction</h1><p>Welcome to the Nexus ML Engine documentation. This guide will help you understand the core concepts and architecture of the engine.</p><h2>Overview</h2><p>Nexus is designed for low-latency, high-throughput transformer inference. It leverages custom CUDA kernels and dynamic batching to maximize hardware utilization.</p>"
  },
  {
    slug: "quickstart",
    title: "Quickstart",
    section: "Getting Started",
    order: 2,
    content: "<h1>Quickstart</h1><p>Get up and running with Nexus in under 5 minutes.</p><h2>Installation</h2><pre><code>curl -sSL https://nexus.example.com/install.sh | bash\n</code></pre><h2>Starting the Server</h2><pre><code>nexus serve --model gpt2 --port 8080\n</code></pre>"
  },
  {
    slug: "architecture",
    title: "Architecture",
    section: "Core Concepts",
    order: 1,
    content: "<h1>Architecture</h1><p>Nexus is built on a highly concurrent Rust backend. It uses a custom asynchronous runtime optimized for tensor operations.</p><h2>The Request Lifecycle</h2><p>When a request arrives, it is immediately placed into a priority queue. The dynamic batcher continuously monitors this queue, assembling optimal batch sizes based on sequence length and model constraints.</p>"
  },
  {
    slug: "dynamic-batching",
    title: "Dynamic Batching",
    section: "Core Concepts",
    order: 2,
    content: "<h1>Dynamic Batching</h1><p>Dynamic batching is the key to Nexus's high throughput. Instead of processing requests sequentially, Nexus groups them together to better utilize the GPU's parallel processing capabilities.</p><h2>Continuous Batching</h2><p>Nexus implements continuous batching (also known as iteration-level batching), which allows requests to join and leave batches at any token generation step.</p>"
  },
  {
    slug: "custom-kernels",
    title: "Custom CUDA Kernels",
    section: "Advanced",
    order: 1,
    content: "<h1>Custom CUDA Kernels</h1><p>To squeeze every last drop of performance out of the hardware, Nexus uses several custom-written CUDA kernels for operations like fused attention and layernorm.</p><p>These kernels are highly optimized for specific GPU architectures (Ampere and Hopper) and sequence length regimes.</p>"
  }
];
