
import React, { useState, useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Pause, Play, SkipForward } from "lucide-react";

const WorkTimer = () => {
  const { tasks, startWorkSession, endWorkSession } = useApp();
  const { toast } = useToast();
  
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [timerMode, setTimerMode] = useState<"pomodoro" | "free">("pomodoro");
  const [pomodoroPhase, setPomodoroPhase] = useState<"work" | "break">("work");
  
  const workDuration = 25 * 60; // 25 minutes in seconds
  const breakDuration = 5 * 60; // 5 minutes in seconds
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 1;
          
          // Handle pomodoro timer transitions
          if (timerMode === "pomodoro") {
            const currentPhaseDuration = pomodoroPhase === "work" ? workDuration : breakDuration;
            
            if (newTime >= currentPhaseDuration) {
              // Phase complete
              const newPhase = pomodoroPhase === "work" ? "break" : "work";
              setPomodoroPhase(newPhase);
              
              toast({
                title: newPhase === "work" ? "Break Complete!" : "Work Session Complete!",
                description: newPhase === "work" 
                  ? "Time to focus on your task." 
                  : "Take a short break now.",
              });
              
              return 0; // Reset timer
            }
          }
          
          return newTime;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timerMode, pomodoroPhase, toast]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleStart = () => {
    const selectedTask = tasks.find(t => t.id === selectedTaskId);
    const sessionId = startWorkSession(selectedTaskId, selectedTask?.title);
    setActiveSessionId(sessionId);
    setIsRunning(true);
    
    toast({
      title: "Work Session Started",
      description: selectedTask 
        ? `Working on: ${selectedTask.title}` 
        : "Working on unlabeled session",
    });
  };
  
  const handlePause = () => {
    setIsRunning(false);
  };
  
  const handleResume = () => {
    setIsRunning(true);
  };
  
  const handleStop = () => {
    if (activeSessionId) {
      endWorkSession(activeSessionId);
      setActiveSessionId(null);
    }
    
    setIsRunning(false);
    setTime(0);
    
    toast({
      title: "Work Session Completed",
      description: `Session duration: ${formatTime(time)}`,
    });
  };
  
  const getCurrentPhaseDisplay = () => {
    if (timerMode === "free") return "Continuous Timer";
    return pomodoroPhase === "work" ? "Work Phase" : "Break Phase";
  };
  
  const getPhaseTimeRemaining = () => {
    if (timerMode === "free") return "";
    
    const currentPhaseDuration = pomodoroPhase === "work" ? workDuration : breakDuration;
    const remaining = currentPhaseDuration - time;
    
    return formatTime(remaining);
  };
  
  const getTimerProgressPercent = () => {
    if (timerMode === "free") return 100;
    
    const currentPhaseDuration = pomodoroPhase === "work" ? workDuration : breakDuration;
    return (time / currentPhaseDuration) * 100;
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Work Timer</h1>
        <p className="text-muted-foreground">
          Focus on deep work with timed sessions
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border">
          <CardHeader>
            <CardTitle>Timer</CardTitle>
            <CardDescription>Track your focused work sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-5xl font-bold">
                    {timerMode === "free" ? formatTime(time) : getPhaseTimeRemaining()}
                  </div>
                </div>
                <div className="absolute inset-0">
                  <div 
                    className="w-full h-full rounded-full border-8 border-muted"
                    style={{
                      background: `conic-gradient(
                        var(--primary) ${getTimerProgressPercent()}%,
                        transparent 0%
                      )`,
                      borderRadius: '50%'
                    }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="text-center text-lg font-medium mt-4">
              {getCurrentPhaseDisplay()}
              {timerMode === "free" && isRunning && (
                <p className="text-sm text-muted-foreground mt-1">
                  Session time: {formatTime(time)}
                </p>
              )}
            </div>
            
            <div className="flex justify-center space-x-4 mt-6">
              {!isRunning && time === 0 ? (
                <Button 
                  onClick={handleStart}
                  disabled={timerMode === "pomodoro" && !selectedTaskId}
                  className="flex items-center"
                >
                  <Play className="mr-2 h-4 w-4" /> Start
                </Button>
              ) : (
                <>
                  {isRunning ? (
                    <Button onClick={handlePause} variant="outline" className="flex items-center">
                      <Pause className="mr-2 h-4 w-4" /> Pause
                    </Button>
                  ) : (
                    <Button onClick={handleResume} className="flex items-center">
                      <Play className="mr-2 h-4 w-4" /> Resume
                    </Button>
                  )}
                  
                  <Button onClick={handleStop} variant="destructive" className="flex items-center">
                    <SkipForward className="mr-2 h-4 w-4" /> End Session
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Configure your work session</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Timer Mode</label>
              <Select 
                value={timerMode}
                onValueChange={(value) => setTimerMode(value as "pomodoro" | "free")}
                disabled={isRunning}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pomodoro">Pomodoro (25/5)</SelectItem>
                  <SelectItem value="free">Free Timer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Task</label>
              <Select 
                value={selectedTaskId}
                onValueChange={setSelectedTaskId}
                disabled={isRunning}
              >
                <SelectTrigger>
                  <SelectValue placeholder="No task selected" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No task</SelectItem>
                  {tasks.filter(task => !task.completed).map((task) => (
                    <SelectItem key={task.id} value={task.id}>
                      {task.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Linking a task will automatically log your work time
              </p>
            </div>
            
            <div className="pt-4 text-center">
              <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm">
                {timerMode === "pomodoro" 
                  ? "Pomodoro: 25 min work, 5 min break" 
                  : "Free Timer: No time limits"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkTimer;
