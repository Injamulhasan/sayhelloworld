import { Link } from "wouter";
import { motion } from "framer-motion";
import { BookOpen, Terminal, Zap, Layers } from "lucide-react";
import { docs } from "@/data/docs";

export default function DocsLanding() {
  const sections = Array.from(new Set(docs.map(d => d.section)));

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-screen-xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mb-16 text-center mx-auto"
      >
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Nexus Documentation</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Comprehensive guides and references for the Nexus ML Engine. Learn how to deploy, configure, and optimize your models for sub-10ms inference.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Quick Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-8 hover-elevate transition-all group"
        >
          <Terminal className="w-8 h-8 text-primary mb-4" />
          <h2 className="text-xl font-bold mb-2">Getting Started</h2>
          <p className="text-muted-foreground mb-6 text-sm">Install the engine and serve your first model in under 5 minutes.</p>
          <Link href="/docs/introduction" className="text-primary font-medium hover:underline text-sm inline-flex items-center gap-1">
            Read Guide &rarr;
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-8 hover-elevate transition-all group"
        >
          <Layers className="w-8 h-8 text-primary mb-4" />
          <h2 className="text-xl font-bold mb-2">Architecture</h2>
          <p className="text-muted-foreground mb-6 text-sm">Understand the inner workings of the continuous batching scheduler.</p>
          <Link href="/docs/architecture" className="text-primary font-medium hover:underline text-sm inline-flex items-center gap-1">
            Read Guide &rarr;
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-8 hover-elevate transition-all group"
        >
          <Zap className="w-8 h-8 text-primary mb-4" />
          <h2 className="text-xl font-bold mb-2">Custom Kernels</h2>
          <p className="text-muted-foreground mb-6 text-sm">Deep dive into the optimized CUDA kernels used for fused operations.</p>
          <Link href="/docs/custom-kernels" className="text-primary font-medium hover:underline text-sm inline-flex items-center gap-1">
            Read Guide &rarr;
          </Link>
        </motion.div>
      </div>

      {/* Directory List */}
      <div className="mt-24 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Full Directory</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
          {sections.map(section => (
            <div key={section}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 font-mono">{section}</h3>
              <ul className="space-y-3">
                {docs
                  .filter(d => d.section === section)
                  .sort((a, b) => a.order - b.order)
                  .map(doc => (
                    <li key={doc.slug}>
                      <Link 
                        href={`/docs/${doc.slug}`}
                        className="text-foreground/80 hover:text-primary transition-colors font-medium"
                      >
                        {doc.title}
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
