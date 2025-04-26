
import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, TrendingUp, DollarSign, Clock, CheckCircle } from "lucide-react";

const Dashboard = () => {
  const { metrics, workSessions } = useApp();
  
  // Calculate total work session time for the week
  const thisWeekSessions = workSessions.filter(session => {
    if (!session.endTime) return false;
    const sessionDate = new Date(session.endTime);
    const today = new Date();
    const startOfWeek = new Date();
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    return sessionDate >= startOfWeek;
  });
  
  const totalMinutesThisWeek = thisWeekSessions.reduce((acc, session) => {
    return acc + (session.duration || 0);
  }, 0);
  
  const formatTimeDisplay = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Track your growth, metrics, and productivity
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Channel Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.subscribers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +5.1% from last month
            </p>
            <div className="mt-3">
              <Link 
                to="/dashboard/kpis" 
                className="text-sm text-primary inline-flex items-center"
              >
                View KPIs <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.revenue > metrics.expenses ? '+' : '-'}${Math.abs(metrics.revenue - metrics.expenses).toLocaleString()} profit
            </p>
            <div className="mt-3">
              <Link 
                to="/dashboard/finances" 
                className="text-sm text-primary inline-flex items-center"
              >
                View Finances <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Work Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatTimeDisplay(totalMinutesThisWeek)}</div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
            <div className="mt-3">
              <Link 
                to="/dashboard/sessions" 
                className="text-sm text-primary inline-flex items-center"
              >
                View Sessions <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Habits</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3/4</div>
            <p className="text-xs text-muted-foreground">
              Daily habits completed
            </p>
            <div className="mt-3">
              <Link 
                to="/dashboard/habits" 
                className="text-sm text-primary inline-flex items-center"
              >
                View Habits <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border">
          <CardHeader>
            <CardTitle>Channel Performance</CardTitle>
            <CardDescription>Views and subscriber growth</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            {/* Placeholder for chart */}
            <div className="w-full h-full bg-muted/20 rounded-lg border border-dashed flex items-center justify-center">
              <p className="text-muted-foreground">Chart visualization</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border">
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>Revenue and expenses</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            {/* Placeholder for chart */}
            <div className="w-full h-full bg-muted/20 rounded-lg border border-dashed flex items-center justify-center">
              <p className="text-muted-foreground">Chart visualization</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border">
        <CardHeader>
          <CardTitle>Recent Work Sessions</CardTitle>
          <CardDescription>Your focused work time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workSessions.slice(0, 3).map((session) => (
              <div key={session.id} className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="font-medium">{session.task || "Unnamed session"}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(session.startTime).toLocaleDateString()} at {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="bg-primary/10 text-primary text-sm px-2 py-1 rounded">
                  {session.duration ? formatTimeDisplay(session.duration) : "In progress"}
                </div>
              </div>
            ))}
            <div className="pt-2">
              <Link to="/dashboard/sessions" className="text-sm text-primary flex items-center">
                View all sessions <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
