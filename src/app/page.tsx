import { MainLayout } from "@/components/layout/MainLayout";
import { CommentMarker } from "@/components/Comments/CommentMarker";
import { Github } from "lucide-react";

export default function Home() {
  return (
    <MainLayout title="Dashboard">
      <div className="max-w-6xl mx-auto p-8 space-y-16 pb-24">
        <header className="space-y-4">
          <div className="inline-block w-fit px-3 py-1 border-2 border-zinc-900 dark:border-white text-xs font-bold tracking-widest text-zinc-900 dark:text-white uppercase">
            Overview
          </div>
          <h1 className="text-6xl font-black tracking-tighter text-zinc-900 dark:text-white">
            Welcome to Prototype Kit
          </h1>
          <p className="text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed font-medium">
            Start building your complex web interfaces with built-in feedback tools. 
            This framework is designed for rapid iteration and stakeholder collaboration.
          </p>
        </header>

        <section className="grid gap-8 md:grid-cols-2">
          <div className="wireframe-card space-y-6 relative group hover:border-zinc-500 transition-colors">
            <div className="absolute top-6 right-6">
              <CommentMarker 
                id="feature-card-1" 
                title="Adaptive Layout" 
                description="The layout automatically adjusts for mobile and desktop screens, featuring an off-canvas sidebar on smaller devices." 
              />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Adaptive Layout</h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 font-medium">
              Responsive sidebar and header navigation that works on any device size. 
              The layout is optimized for high-density information displays.
            </p>
          </div>

          <div className="wireframe-card space-y-6 relative group hover:border-zinc-500 transition-colors">
            <div className="absolute top-6 right-6">
              <CommentMarker 
                id="feature-card-2" 
                title="Comment System" 
                description="Built-in real-time comment system to capture stakeholder feedback directly on the UI." 
              />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Built-in Comments</h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 font-medium">
              Real-time collaboration right inside your prototype. Drop a CommentMarker anywhere 
              to collect context-specific feedback from your team.
            </p>
          </div>
        </section>

        <div className="flex flex-col items-center gap-6 pt-16 border-t-2 border-zinc-900 dark:border-white">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-black uppercase tracking-tight">Open Source Prototype</h3>
            <p className="text-zinc-600 dark:text-zinc-400 font-medium">
              Contributions and feedback are welcome on GitHub.
            </p>
          </div>
          <a 
            href="https://github.com/anton-g-kulikov/prototype-kit" 
            target="_blank" 
            rel="noopener noreferrer"
            className="wireframe-button flex items-center gap-3 bg-zinc-900 text-white hover:bg-zinc-100 hover:text-zinc-900 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-white transition-all"
          >
            <Github size={20} />
            <span className="text-lg">View on GitHub</span>
          </a>
        </div>
      </div>
    </MainLayout>
  );
}
