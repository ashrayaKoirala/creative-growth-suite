
import React, { createContext, useContext, useState, useEffect } from "react";

// Define types for our data
type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  priority: "low" | "medium" | "high";
  tags?: string[];
};

type WorkSession = {
  id: string;
  taskId?: string;
  startTime: Date;
  endTime?: Date;
  duration?: number; // in minutes
  task?: string;
};

type ContentProject = {
  id: string;
  title: string;
  stage: "idea" | "script" | "record" | "edit" | "upload" | "analyze";
  dueDate?: Date;
  notes?: string;
};

type UserMetrics = {
  views: number;
  subscribers: number;
  rpm: number;
  revenue: number;
  expenses: number;
  netProfit: number;
};

type UserFile = {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  createdAt: Date;
};

type AppContextType = {
  userName: string;
  setUserName: (name: string) => void;
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  workSessions: WorkSession[];
  startWorkSession: (taskId?: string, task?: string) => string;
  endWorkSession: (id: string) => void;
  contentProjects: ContentProject[];
  addContentProject: (project: Omit<ContentProject, "id">) => void;
  updateContentProjectStage: (id: string, stage: ContentProject["stage"]) => void;
  metrics: UserMetrics;
  files: UserFile[];
  addFile: (file: Omit<UserFile, "id" | "createdAt">) => void;
};

const defaultContext: AppContextType = {
  userName: "User",
  setUserName: () => {},
  tasks: [],
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
  workSessions: [],
  startWorkSession: () => "",
  endWorkSession: () => {},
  contentProjects: [],
  addContentProject: () => {},
  updateContentProjectStage: () => {},
  metrics: {
    views: 0,
    subscribers: 0,
    rpm: 0,
    revenue: 0,
    expenses: 0,
    netProfit: 0
  },
  files: [],
  addFile: () => {},
};

const AppContext = createContext<AppContextType>(defaultContext);

export const useApp = () => useContext(AppContext);

export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [userName, setUserName] = useState("Ashraya");
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Record new video",
      description: "Create a tutorial about the new editing software",
      dueDate: new Date("2025-04-28"),
      completed: false,
      priority: "high",
      tags: ["content", "tutorial"]
    },
    {
      id: "2",
      title: "Edit podcast episode",
      description: "Cut and mix the interview with Dr. Smith",
      dueDate: new Date("2025-04-30"),
      completed: false,
      priority: "medium",
      tags: ["podcast", "editing"]
    },
    {
      id: "3",
      title: "Post on social media",
      description: "Share new video on Twitter, Instagram and TikTok",
      dueDate: new Date("2025-04-27"),
      completed: false,
      priority: "low",
      tags: ["marketing"]
    }
  ]);
  
  const [workSessions, setWorkSessions] = useState<WorkSession[]>([
    {
      id: "ws1",
      taskId: "1",
      startTime: new Date("2025-04-25T09:00:00"),
      endTime: new Date("2025-04-25T10:30:00"),
      duration: 90,
      task: "Record new video"
    },
    {
      id: "ws2",
      taskId: "2",
      startTime: new Date("2025-04-25T14:00:00"),
      endTime: new Date("2025-04-25T16:00:00"),
      duration: 120,
      task: "Edit podcast episode"
    }
  ]);
  
  const [contentProjects, setContentProjects] = useState<ContentProject[]>([
    {
      id: "cp1",
      title: "YouTube Tutorial Series - Video Editing",
      stage: "script",
      dueDate: new Date("2025-05-15")
    },
    {
      id: "cp2",
      title: "Client Project - Wedding Video",
      stage: "edit",
      dueDate: new Date("2025-05-05")
    },
    {
      id: "cp3",
      title: "Podcast Episode #42",
      stage: "record",
      dueDate: new Date("2025-04-30")
    }
  ]);
  
  const [metrics, setMetrics] = useState<UserMetrics>({
    views: 175420,
    subscribers: 12500,
    rpm: 4.32,
    revenue: 3250,
    expenses: 850,
    netProfit: 2400
  });
  
  const [files, setFiles] = useState<UserFile[]>([
    {
      id: "f1",
      name: "interview-raw.mp4",
      type: "video/mp4",
      size: 2500000000,
      url: "/files/interview-raw.mp4",
      createdAt: new Date("2025-04-20")
    },
    {
      id: "f2",
      name: "tutorial-script.docx",
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      size: 25000,
      url: "/files/tutorial-script.docx",
      createdAt: new Date("2025-04-22")
    },
    {
      id: "f3",
      name: "podcast-intro.wav",
      type: "audio/wav",
      size: 50000000,
      url: "/files/podcast-intro.wav",
      createdAt: new Date("2025-04-23")
    }
  ]);
  
  const addTask = (newTask: Omit<Task, "id">) => {
    const task = {
      ...newTask,
      id: Date.now().toString()
    };
    setTasks([...tasks, task]);
  };
  
  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };
  
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  const startWorkSession = (taskId?: string, taskName?: string) => {
    const id = Date.now().toString();
    const newSession: WorkSession = {
      id,
      taskId,
      startTime: new Date(),
      task: taskName
    };
    setWorkSessions([...workSessions, newSession]);
    return id;
  };
  
  const endWorkSession = (id: string) => {
    const endTime = new Date();
    setWorkSessions(workSessions.map(session => {
      if (session.id === id) {
        const durationMs = endTime.getTime() - session.startTime.getTime();
        const durationMinutes = Math.round(durationMs / 60000);
        return {
          ...session,
          endTime,
          duration: durationMinutes
        };
      }
      return session;
    }));
  };
  
  const addContentProject = (project: Omit<ContentProject, "id">) => {
    const newProject = {
      ...project,
      id: Date.now().toString()
    };
    setContentProjects([...contentProjects, newProject]);
  };
  
  const updateContentProjectStage = (id: string, stage: ContentProject["stage"]) => {
    setContentProjects(contentProjects.map(project => 
      project.id === id ? {...project, stage} : project
    ));
  };
  
  const addFile = (fileData: Omit<UserFile, "id" | "createdAt">) => {
    const newFile = {
      ...fileData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setFiles([...files, newFile]);
  };
  
  return (
    <AppContext.Provider value={{
      userName,
      setUserName,
      tasks,
      addTask,
      updateTask,
      deleteTask,
      workSessions,
      startWorkSession,
      endWorkSession,
      contentProjects,
      addContentProject,
      updateContentProjectStage,
      metrics,
      files,
      addFile
    }}>
      {children}
    </AppContext.Provider>
  );
};
