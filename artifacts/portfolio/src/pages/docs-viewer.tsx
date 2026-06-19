import { useParams, Link } from "wouter";
import { docs } from "@/data/docs";
import NotFound from "@/pages/not-found";

export default function DocsViewer() {
  const { slug } = useParams();
  const currentDoc = docs.find(d => d.slug === slug);

  if (!currentDoc) {
    return <NotFound />;
  }

  const sections = Array.from(new Set(docs.map(d => d.section)));

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-screen-xl flex flex-col md:flex-row gap-8 lg:gap-16 items-start">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 shrink-0 md:sticky md:top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 hidden md:block">
        <div className="mb-8">
          <Link href="/docs" className="text-lg font-bold hover:text-primary transition-colors">
            Documentation
          </Link>
        </div>
        
        <nav className="space-y-8">
          {sections.map(section => (
            <div key={section}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 font-mono">
                {section}
              </h4>
              <ul className="space-y-2 border-l border-border ml-2">
                {docs
                  .filter(d => d.section === section)
                  .sort((a, b) => a.order - b.order)
                  .map(doc => {
                    const isActive = doc.slug === slug;
                    return (
                      <li key={doc.slug}>
                        <Link 
                          href={`/docs/${doc.slug}`}
                          className={`block pl-4 py-1 text-sm border-l-2 -ml-[1px] transition-colors ${
                            isActive 
                              ? "border-primary text-primary font-bold" 
                              : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                          }`}
                        >
                          {doc.title}
                        </Link>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full min-w-0">
        {/* Mobile Nav Dropdown (simplified) */}
        <div className="md:hidden mb-8 border-b border-border pb-4">
          <Link href="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            &larr; Back to Documentation Index
          </Link>
        </div>

        <div className="mb-4 text-sm font-mono text-primary bg-primary/10 inline-block px-3 py-1 rounded">
          {currentDoc.section}
        </div>

        <div 
          className="prose prose-zinc dark:prose-invert max-w-3xl prose-headings:font-bold prose-h1:text-4xl prose-h1:mb-8 prose-h2:mt-12 prose-a:text-primary prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-border"
          dangerouslySetInnerHTML={{ __html: currentDoc.content }}
        />
        
        <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
           <p className="text-sm text-muted-foreground">Last updated: Today</p>
           <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
             Edit this page
           </a>
        </div>
      </main>
      
      {/* On This Page / Table of Contents placeholder for wide screens */}
      <div className="w-48 shrink-0 hidden xl:block md:sticky md:top-24">
        <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">On This Page</h4>
        <ul className="text-sm text-muted-foreground space-y-2">
           <li><a href="#" className="hover:text-primary transition-colors">Introduction</a></li>
           <li><a href="#" className="hover:text-primary transition-colors">Overview</a></li>
        </ul>
      </div>
    </div>
  );
}
