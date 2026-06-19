import { Link } from "wouter";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4 font-mono">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-foreground/80">Page Not Found</h2>
        
        <p className="text-muted-foreground mb-8">
          The requested resource could not be located. It may have been moved or deleted.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center justify-center h-11 px-8 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Return Home
        </Link>
      </motion.div>
    </div>
  );
}
