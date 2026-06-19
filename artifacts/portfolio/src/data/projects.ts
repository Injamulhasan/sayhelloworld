export interface Project {
  title: string;
  year: string;
  category: "WEB" | "ML" | "API";
  summary: string;
  tags: string[];
  links: {
    live?: string;
    code?: string;
    demo?: string;
  };
  features: string[];
}

export const projects: Project[] = [
  {
    title: "Nexus ML Engine",
    year: "2024",
    category: "ML",
    summary: "A high-performance inference engine built in Rust, capable of serving transformer models with sub-10ms latency.",
    tags: ["Rust", "PyTorch", "CUDA"],
    links: { code: "https://github.com/example/nexus" },
    features: ["Dynamic batching", "Custom CUDA kernels", "Prometheus metrics"]
  },
  {
    title: "OmniSearch API",
    year: "2023",
    category: "API",
    summary: "Unified semantic search API aggregating data across 10+ enterprise tools using hybrid search techniques.",
    tags: ["Go", "gRPC", "Elasticsearch"],
    links: { live: "https://api.example.com/search", docs: "https://docs.example.com" },
    features: ["Hybrid search (BM25 + Vector)", "Sub-50ms latency", "Role-based access control"]
  },
  {
    title: "Synthetica Dashboard",
    year: "2023",
    category: "WEB",
    summary: "React-based control panel for monitoring fleet-wide model performance and initiating active learning campaigns.",
    tags: ["React", "TypeScript", "Tailwind"],
    links: { live: "https://dashboard.example.com", code: "https://github.com/example/dash" },
    features: ["Real-time telemetry", "Interactive data labeling", "WebGL visualizations"]
  },
  {
    title: "Cortex Agents",
    year: "2024",
    category: "ML",
    summary: "Framework for deploying multi-agent LLM systems with autonomous reasoning and tool use capabilities.",
    tags: ["Python", "LangChain", "OpenAI"],
    links: { code: "https://github.com/example/cortex" },
    features: ["Agent-to-agent communication", "Memory management", "Sandboxed execution"]
  },
  {
    title: "NeuroGraph UI",
    year: "2022",
    category: "WEB",
    summary: "Interactive visualization tool for exploring massive knowledge graphs and semantic relationships.",
    tags: ["Svelte", "D3.js", "GraphQL"],
    links: { demo: "https://demo.example.com/neurograph" },
    features: ["Force-directed layouts", "Temporal filtering", "Export to SVG"]
  },
  {
    title: "Gateway Gateway",
    year: "2023",
    category: "API",
    summary: "High-throughput API gateway designed specifically for routing and rate-limiting LLM traffic.",
    tags: ["Rust", "Redis", "Docker"],
    links: { code: "https://github.com/example/gateway" },
    features: ["Token-based rate limiting", "Cost tracking", "Automatic retries"]
  },
  {
    title: "Visionary Core",
    year: "2022",
    category: "ML",
    summary: "Computer vision library for zero-shot object detection and segmentation in manufacturing environments.",
    tags: ["Python", "OpenCV", "TensorRT"],
    links: { code: "https://github.com/example/visionary" },
    features: ["Zero-shot detection", "Edge deployment optimized", "ONNX support"]
  },
  {
    title: "Pulse Analytics",
    year: "2021",
    category: "WEB",
    summary: "Real-time stream processing and visualization platform for IoT sensor data.",
    tags: ["Vue", "WebSockets", "TimescaleDB"],
    links: { live: "https://pulse.example.com" },
    features: ["Live streaming dashboards", "Anomaly detection alerts", "Historical data replay"]
  }
];
