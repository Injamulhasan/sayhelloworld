import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/data/blog";
import NotFound from "@/pages/not-found";

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <NotFound />;
  }

  return (
    <article className="container mx-auto px-4 py-12 md:py-24 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to writing
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-muted-foreground mb-8">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {post.pubDate}
            </span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {post.readingTime}
            </span>
            <span className="hidden md:inline">•</span>
            <span>By Alex Engineer</span>
          </div>
          
          <div className="flex gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs border border-border text-foreground px-3 py-1 rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Using Tailwind Typography (prose) for formatting raw HTML */}
        <div 
          className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <hr className="my-12 border-border" />
        
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground italic">Thanks for reading.</p>
          <Link href="/blog" className="text-primary font-medium hover:underline">
            Read more articles &rarr;
          </Link>
        </div>
      </motion.div>
    </article>
  );
}
