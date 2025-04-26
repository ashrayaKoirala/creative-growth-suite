
import { Link, useLocation } from "react-router-dom";
import { Home, Search, List, FileText, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-border transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b">
          <div className="text-xl font-bold text-primary flex items-center">
            {isOpen ? "CreatorSuite" : "CS"}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {/* Dashboard */}
            <li>
              <Link
                to="/"
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium transition-colors",
                  isActive("/") && !isActive("/dashboard") && !isActive("/workers") && !isActive("/tasks") && !isActive("/files")
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <Home className="w-5 h-5 mr-3" />
                {isOpen && <span>Home</span>}
              </Link>
            </li>

            {/* Workers */}
            <li>
              <Link
                to="/workers"
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium transition-colors",
                  isActive("/workers")
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <Settings className="w-5 h-5 mr-3" />
                {isOpen && <span>Workers</span>}
              </Link>
            </li>

            {/* Dashboard */}
            <li>
              <Link
                to="/dashboard"
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium transition-colors",
                  isActive("/dashboard")
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <Search className="w-5 h-5 mr-3" />
                {isOpen && <span>Dashboard</span>}
              </Link>
            </li>

            {/* Tasks */}
            <li>
              <Link
                to="/tasks"
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium transition-colors",
                  isActive("/tasks")
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <List className="w-5 h-5 mr-3" />
                {isOpen && <span>Tasks</span>}
              </Link>
            </li>

            {/* Files */}
            <li>
              <Link
                to="/files"
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium transition-colors",
                  isActive("/files")
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <FileText className="w-5 h-5 mr-3" />
                {isOpen && <span>Files</span>}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Toggle Button */}
        <div className="flex items-center justify-center p-4 border-t">
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-muted transition-colors"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
