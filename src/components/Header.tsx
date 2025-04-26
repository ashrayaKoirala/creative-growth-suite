
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";

type HeaderProps = {
  toggleSidebar: () => void;
};

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName, setUserName] = useState("User");
  
  useEffect(() => {
    // Update the time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    // Simulate getting user data
    // In a real app, this would come from authentication
    setTimeout(() => {
      setUserName("Ashraya");
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = currentTime.toLocaleDateString([], { month: '2-digit', day: '2-digit', year: 'numeric' });
  
  return (
    <header className="h-16 border-b bg-background/90 backdrop-blur-sm sticky top-0 z-30 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md text-muted-foreground hover:bg-muted mr-2 md:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h18" />
            <path d="M3 6h18" />
            <path d="M3 18h18" />
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </button>
        
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="text-sm font-medium hover:text-primary">
            Work
          </Link>
          <Link to="/workers" className="text-sm font-medium hover:text-primary">
            Productivity
          </Link>
          <Link to="/dashboard/finances" className="text-sm font-medium hover:text-primary">
            Finance
          </Link>
        </nav>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-sm text-right">
          <span>{formattedTime} {formattedDate}</span>
        </div>
        <button className="p-2 rounded-full hover:bg-muted">
          <Bell className="w-5 h-5" />
          <span className="sr-only">Notifications</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
