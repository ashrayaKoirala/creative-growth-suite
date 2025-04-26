
import React from "react";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

type WorkerTool = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

const Workers = () => {
  const videoTools: WorkerTool[] = [
    {
      title: "Cut Profile Generator",
      description: "Upload video + transcript to generate smart cut suggestions",
      path: "/workers/cut-profile",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=300"
    },
    {
      title: "Video Cutter",
      description: "Automatically cut videos based on cut profile JSON",
      path: "/workers/video-cutter",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&h=300"
    },
    {
      title: "Silence Remover",
      description: "Automatically remove silent parts from videos or audio",
      path: "/workers/silence-remover",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&h=300"
    },
    {
      title: "Satisfying Video Creator",
      description: "Create montages with crossfades, color boosts, and speed increases",
      path: "/workers/satisfy",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=300&h=300"
    },
    {
      title: "Subtitle Generator",
      description: "Auto-generate subtitles from transcript with customizable styles",
      path: "/workers/subtitles",
      image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=300&h=300"
    },
    {
      title: "Emoji Overlay Generator",
      description: "Apply popping emoji overlays based on transcript keywords",
      path: "/workers/overlay",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=300&h=300"
    },
    {
      title: "Final Renderer",
      description: "Arrange clips to create final videos with optional intro/outro",
      path: "/workers/renderer",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=300&h=300"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Video Workers</h1>
        <p className="text-muted-foreground">
          AI-powered tools to streamline your video production workflow
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoTools.map((tool) => (
          <Link key={tool.title} to={tool.path}>
            <Card className="hover-card h-full overflow-hidden border">
              {tool.image && (
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={tool.image}
                    alt={tool.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium">
                    Open Tool
                  </button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Workers;
