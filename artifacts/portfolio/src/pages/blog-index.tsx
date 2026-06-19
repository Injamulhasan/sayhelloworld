import { Link } from "wouter";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/data/blog";

export default function BlogIndex() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-3xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Writing</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Thoughts on machine learning systems, infrastructure engineering, and the realities of shipping production AI.
        </p>
      </motion.div>

      <div className="space-y-8">
        {blogPosts.map((post, index) => (
          <motion.article 
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <Link 
              href={`/blog/${post.slug}`}
              className="block p-6 -mx-6 rounded-2xl hover:bg-card hover:shadow-sm border border-transparent hover:border-border transition-all"
              data-testid={`blog-post-link-${post.slug}`}
            >
              <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {post.pubDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post.readingTime}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {post.description}
              </p>
              
              <div className="flex gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
