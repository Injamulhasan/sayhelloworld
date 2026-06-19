import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, MonitorPlay, Code2, Cpu, Globe } from "lucide-react";
import { projects } from "@/data/projects";

type Category = "ALL" | "WEB" | "ML" | "API";

export default function Projects() {
  const [filter, setFilter] = useState<Category>("ALL");

  const filteredProjects = projects.filter(
    (p) => filter === "ALL" || p.category === filter
  );

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-screen-xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Projects Showcase</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          A selection of production systems, research implementations, and open-source tools I've built. 
          Focusing on high-performance inference, scalable APIs, and intuitive data interfaces.
        </p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-12">
        {(["ALL", "WEB", "ML", "API"] as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              filter === cat 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
            data-testid={`filter-btn-${cat.toLowerCase()}`}
          >
            {cat === "ALL" ? "All Projects" : cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border rounded-xl flex flex-col overflow-hidden hover-elevate transition-all group"
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono px-2 py-1 bg-muted text-muted-foreground rounded">
                    {project.year}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold tracking-widest text-primary bg-primary/10 px-2 py-1 rounded uppercase">
                    {project.category === "WEB" && <Globe className="w-3 h-3" />}
                    {project.category === "ML" && <Cpu className="w-3 h-3" />}
                    {project.category === "API" && <Code2 className="w-3 h-3" />}
                    {project.category}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-6 flex-1">
                  {project.summary}
                </p>
                
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] border border-border text-foreground px-2 py-1 rounded-sm font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.features.slice(0, 2).map(feature => (
                      <span key={feature} className="text-[10px] bg-secondary text-secondary-foreground px-2 py-1 rounded-sm">
                        ✓ {feature}
                      </span>
                    ))}
                    {project.features.length > 2 && (
                      <span className="text-[10px] text-muted-foreground px-1 py-1">
                        +{project.features.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Card Footer Links */}
              <div className="border-t border-border bg-muted/30 p-4 flex items-center gap-4">
                {project.links.code && (
                  <a href={project.links.code} target="_blank" rel="noreferrer" className="text-sm font-medium flex items-center gap-2 hover:text-primary transition-colors" data-testid={`project-link-code-${project.title}`}>
                    <Github className="w-4 h-4" /> Code
                  </a>
                )}
                {project.links.live && (
                  <a href={project.links.live} target="_blank" rel="noreferrer" className="text-sm font-medium flex items-center gap-2 hover:text-primary transition-colors" data-testid={`project-link-live-${project.title}`}>
                    <ExternalLink className="w-4 h-4" /> Live App
                  </a>
                )}
                {project.links.demo && (
                  <a href={project.links.demo} target="_blank" rel="noreferrer" className="text-sm font-medium flex items-center gap-2 hover:text-primary transition-colors" data-testid={`project-link-demo-${project.title}`}>
                    <MonitorPlay className="w-4 h-4" /> Demo
                  </a>
                )}
                {Object.keys(project.links).length === 0 && (
                  <span className="text-sm text-muted-foreground italic">Private Repository</span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
