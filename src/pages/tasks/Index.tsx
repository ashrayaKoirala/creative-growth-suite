
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Plus, Trash } from "lucide-react";

const Tasks = () => {
  const { tasks, addTask, updateTask, deleteTask } = useApp();
  const [newTask, setNewTask] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<"low" | "medium" | "high">("medium");
  
  // Filter tasks
  const todayTasks = tasks.filter(task => 
    task.dueDate && new Date(task.dueDate).toDateString() === new Date().toDateString()
  );
  
  const weekTasks = tasks.filter(task => {
    if (!task.dueDate) return false;
    const taskDate = new Date(task.dueDate);
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    return taskDate > today && taskDate <= nextWeek;
  });
  
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    addTask({
      title: newTask,
      completed: false,
      priority: newTaskPriority,
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      tags: ["new"]
    });
    
    setNewTask("");
  };
  
  const handleToggleComplete = (taskId: string, completed: boolean) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      updateTask({ ...task, completed });
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Task Manager</h1>
        <p className="text-muted-foreground">
          Organize your projects and track your progress
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="border">
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
              <CardDescription>View and manage your tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Tasks</TabsTrigger>
                  <TabsTrigger value="today">Due Today ({todayTasks.length})</TabsTrigger>
                  <TabsTrigger value="week">This Week ({weekTasks.length})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4">
                  {tasks.length === 0 ? (
                    <p className="text-center py-4 text-muted-foreground">No tasks yet. Add a task to get started.</p>
                  ) : (
                    tasks.map(task => (
                      <div 
                        key={task.id} 
                        className={`p-3 border rounded-md flex items-center justify-between ${
                          task.completed ? "bg-muted/50" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleToggleComplete(task.id, !task.completed)}
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              task.completed ? "bg-primary text-primary-foreground" : "bg-background"
                            }`}
                          >
                            {task.completed && <Check className="w-3 h-3" />}
                          </button>
                          <div>
                            <h3 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                              {task.title}
                            </h3>
                            {task.description && (
                              <p className="text-sm text-muted-foreground">{task.description}</p>
                            )}
                            <div className="flex flex-wrap gap-1 mt-1">
                              {task.tags?.map(tag => (
                                <span key={tag} className="text-xs bg-secondary px-2 py-0.5 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {task.dueDate && (
                            <span className={`text-xs px-2 py-1 rounded ${
                              task.priority === "high" ? "bg-destructive/10 text-destructive" :
                              task.priority === "medium" ? "bg-yellow-500/10 text-yellow-600" :
                              "bg-green-500/10 text-green-600"
                            }`}>
                              {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          )}
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </TabsContent>
                
                <TabsContent value="today" className="space-y-4">
                  {todayTasks.length === 0 ? (
                    <p className="text-center py-4 text-muted-foreground">No tasks due today.</p>
                  ) : (
                    todayTasks.map(task => (
                      <div 
                        key={task.id} 
                        className={`p-3 border rounded-md flex items-center justify-between ${
                          task.completed ? "bg-muted/50" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleToggleComplete(task.id, !task.completed)}
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              task.completed ? "bg-primary text-primary-foreground" : "bg-background"
                            }`}
                          >
                            {task.completed && <Check className="w-3 h-3" />}
                          </button>
                          <div>
                            <h3 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                              {task.title}
                            </h3>
                            {task.description && (
                              <p className="text-sm text-muted-foreground">{task.description}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </TabsContent>
                
                <TabsContent value="week" className="space-y-4">
                  {weekTasks.length === 0 ? (
                    <p className="text-center py-4 text-muted-foreground">No tasks due this week.</p>
                  ) : (
                    weekTasks.map(task => (
                      <div 
                        key={task.id} 
                        className={`p-3 border rounded-md flex items-center justify-between ${
                          task.completed ? "bg-muted/50" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleToggleComplete(task.id, !task.completed)}
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              task.completed ? "bg-primary text-primary-foreground" : "bg-background"
                            }`}
                          >
                            {task.completed && <Check className="w-3 h-3" />}
                          </button>
                          <div>
                            <h3 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                              {task.title}
                            </h3>
                            {task.description && (
                              <p className="text-sm text-muted-foreground">{task.description}</p>
                            )}
                            {task.dueDate && (
                              <p className="text-xs text-muted-foreground">
                                Due: {new Date(task.dueDate).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="border">
            <CardHeader>
              <CardTitle>Add Task</CardTitle>
              <CardDescription>Create a new task</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddTask} className="space-y-4">
                <div>
                  <Input
                    placeholder="Task name"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                  />
                </div>
                <div>
                  <Select 
                    value={newTaskPriority} 
                    onValueChange={(value) => setNewTaskPriority(value as "low" | "medium" | "high")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">
                  <Plus className="w-4 h-4 mr-2" /> Add Task
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="mt-6 space-y-4">
            <Card className="border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Work Timer</CardTitle>
                <CardDescription>Start a focused work session</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/tasks/work-timer">
                  <Button variant="outline" className="w-full">Start Timer</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Content Tracker</CardTitle>
                <CardDescription>Track your content production</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/tasks/content-tracker">
                  <Button variant="outline" className="w-full">View Tracker</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
