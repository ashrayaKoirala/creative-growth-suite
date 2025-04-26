
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface ComingSoonPageProps {
  title: string;
  description: string;
  returnPath: string;
  returnLabel: string;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({
  title,
  description,
  returnPath,
  returnLabel,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      <div className="flex flex-col items-center justify-center py-12">
        <div className="dot-pattern-light w-24 h-24 rounded-full mb-6 flex items-center justify-center">
          <div className="text-3xl animate-pulse">⚡</div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          We're working hard to bring this feature to you. Check back soon!
        </p>
        <Button asChild>
          <Link to={returnPath} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> {returnLabel}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ComingSoonPage;
