import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Code2, Database, Globe, Cpu, Server } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Home() {
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-screen-xl">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center md:items-start gap-12 mb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative shrink-0"
        >
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          <Avatar className="w-32 h-32 md:w-48 md:h-48 border border-border bg-card relative z-10">
            <AvatarFallback className="text-4xl md:text-6xl font-serif text-muted-foreground bg-card">AE</AvatarFallback>
          </Avatar>
        </motion.div>

        <div className="flex-1 text-center md:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
          >
            Alex Engineer
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-6 font-mono"
          >
            Senior AI/ML Systems Engineer
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-foreground/80 mb-8 max-w-2xl leading-relaxed"
          >
            Building high-performance inference engines, scalable data pipelines, and intelligent agents. Bridging the gap between cutting-edge research and reliable production systems.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-4"
          >
            <a 
              href="mailto:contact@example.com" 
              className="inline-flex items-center justify-center h-11 px-8 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              data-testid="btn-contact"
            >
              Get in touch
            </a>
            <Link 
              href="/projects" 
              className="inline-flex items-center justify-center h-11 px-8 rounded-md bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
              data-testid="btn-view-work"
            >
              View Work
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="mb-32">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <Cpu className="w-6 h-6 text-primary" />
          <span>At a Glance</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
          {/* Card 1: Current Role */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 md:row-span-1 bg-card border border-border rounded-xl p-8 hover-elevate transition-all group"
          >
            <div className="text-sm font-mono text-muted-foreground mb-4">Current Role</div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Staff ML Engineer @ Nexus</h3>
            <p className="text-muted-foreground">Leading the core inference team, optimizing transformer models for sub-10ms latency across global clusters.</p>
          </motion.div>

          {/* Card 2: Open Source */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-1 md:row-span-1 bg-card border border-border rounded-xl p-8 hover-elevate transition-all flex flex-col justify-between group"
          >
            <div className="text-sm font-mono text-muted-foreground mb-4">Open Source</div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">1.2k+</div>
              <p className="text-muted-foreground">Contributions in the last year across PyTorch, Rust, and LangChain ecosystems.</p>
            </div>
          </motion.div>

          {/* Card 3: Technical Arsenal */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1 md:row-span-2 bg-card border border-border rounded-xl p-8 hover-elevate transition-all"
          >
            <div className="text-sm font-mono text-muted-foreground mb-6">Technical Arsenal</div>
            <div className="flex flex-col gap-6">
              <div>
                <h4 className="text-sm font-bold mb-3 text-foreground/80">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {['Rust', 'Python', 'Go', 'TypeScript', 'C++'].map(lang => (
                    <span key={lang} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full font-mono">{lang}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold mb-3 text-foreground/80">Frameworks</h4>
                <div className="flex flex-wrap gap-2">
                  {['PyTorch', 'TensorFlow', 'React', 'Next.js'].map(lang => (
                    <span key={lang} className="px-3 py-1 bg-secondary/50 text-secondary-foreground text-xs rounded-full">{lang}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold mb-3 text-foreground/80">Infrastructure</h4>
                <div className="flex flex-wrap gap-2">
                  {['Kubernetes', 'CUDA', 'AWS', 'Redis'].map(lang => (
                    <span key={lang} className="px-3 py-1 bg-secondary/50 text-secondary-foreground text-xs rounded-full">{lang}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Education */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 md:row-span-1 bg-card border border-border rounded-xl p-8 hover-elevate transition-all"
          >
            <div className="text-sm font-mono text-muted-foreground mb-4">Education</div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold font-serif">M</div>
              <div>
                <h3 className="text-xl font-bold">M.S. Computer Science</h3>
                <p className="text-muted-foreground">Stanford University &bull; Focus in Artificial Intelligence</p>
              </div>
            </div>
          </motion.div>

          {/* Card 5: Currently Building */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-2 md:row-span-1 bg-primary border border-primary-border rounded-xl p-8 text-primary-foreground hover-elevate transition-all group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
            <div className="relative z-10">
              <div className="text-sm font-mono text-primary-foreground/80 mb-4">Currently Building</div>
              <h3 className="text-2xl font-bold mb-2">OmniSearch API</h3>
              <p className="text-primary-foreground/90 mb-4 max-w-md">A unified semantic search API aggregating data across enterprise tools using hybrid search techniques.</p>
              <Link href="/projects" className="inline-flex items-center text-sm font-medium hover:text-white transition-colors gap-1 group-hover:gap-2">
                View Project <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Code2 className="w-6 h-6 text-primary" />
            <span>Recent Writing</span>
          </h2>
          <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                href={`/blog/${post.slug}`}
                className="group block h-full bg-card border border-border rounded-xl p-6 hover-elevate transition-all"
                data-testid={`home-post-${post.slug}`}
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider font-mono px-2 py-1 bg-secondary text-secondary-foreground rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                  {post.description}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground font-mono mt-auto">
                  <span>{post.pubDate}</span>
                  <span>{post.readingTime}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
