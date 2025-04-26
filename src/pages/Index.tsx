
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/contexts/AppContext";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const { userName, tasks, metrics, contentProjects } = useApp();
  
  // Filter for incomplete tasks due soon
  const upcomingTasks = tasks
    .filter(task => !task.completed && task.dueDate)
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 3);
    
  // Filter for content projects in progress
  const activeProjects = contentProjects.slice(0, 5);
  
  // Get current time for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
  
  return (
    <div className="space-y-6">
      <section className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{getGreeting()}, {userName}</h1>
        {upcomingTasks.length > 0 && (
          <p className="text-muted-foreground">
            Next Task: {upcomingTasks[0].title}
          </p>
        )}
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.views.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.subscribers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+5.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">-0.8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.netProfit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+1.2% from last month</p>
          </CardContent>
        </Card>
      </section>
      
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Projects */}
        <Card className="border bg-card">
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
            <CardDescription>Your content in progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-sm text-muted-foreground capitalize">Stage: {project.stage}</p>
                  </div>
                  <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                    {project.dueDate && new Date(project.dueDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
              <Link to="/tasks/content-tracker" className="text-sm text-primary flex items-center">
                View all projects <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
        
        {/* Upcoming Tasks */}
        <Card className="border bg-card">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Tasks due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{task.title}</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {task.tags?.map((tag) => (
                        <span key={tag} className="text-xs bg-secondary px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded ${
                    task.priority === "high" ? "bg-destructive/10 text-destructive" :
                    task.priority === "medium" ? "bg-yellow-500/10 text-yellow-600" :
                    "bg-green-500/10 text-green-600"
                  }`}>
                    {task.dueDate && new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
              <Link to="/tasks" className="text-sm text-primary flex items-center">
                View all tasks <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        <h2 className="text-2xl font-semibold col-span-full mb-2">Quick Access</h2>
        
        <Link to="/workers/cut-profile">
          <div className="content-card hover-card h-full flex flex-col items-center justify-center gap-4 p-6">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=300"
              alt="Cut Profile Generator"
              className="rounded-md w-full h-48 object-cover"
            />
            <div className="text-center">
              <h3 className="font-medium">Cut Profile</h3>
              <p className="text-sm text-muted-foreground">Smart video cutting</p>
            </div>
          </div>
        </Link>
        
        <Link to="/workers/silence-remover">
          <div className="content-card hover-card h-full flex flex-col items-center justify-center gap-4 p-6">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&h=300"
              alt="Silence Remover"
              className="rounded-md w-full h-48 object-cover"
            />
            <div className="text-center">
              <h3 className="font-medium">Silence Trim</h3>
              <p className="text-sm text-muted-foreground">Remove silent parts</p>
            </div>
          </div>
        </Link>
        
        <Link to="/tasks">
          <div className="content-card hover-card h-full flex flex-col items-center justify-center gap-4 p-6">
            <img 
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=300&h=300"
              alt="Task Manager"
              className="rounded-md w-full h-48 object-cover"
            />
            <div className="text-center">
              <h3 className="font-medium">Tasks</h3>
              <p className="text-sm text-muted-foreground">Manage your tasks</p>
            </div>
          </div>
        </Link>
        
        <Link to="/files">
          <div className="content-card hover-card h-full flex flex-col items-center justify-center gap-4 p-6">
            <img 
              src="https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=300&h=300"
              alt="File Manager"
              className="rounded-md w-full h-48 object-cover"
            />
            <div className="text-center">
              <h3 className="font-medium">Data Bank</h3>
              <p className="text-sm text-muted-foreground">File Manager</p>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default Index;
