import { create } from 'zustand';

interface Task {
  id: number;
  text: string;
  notes?: string;
  date?: string;
  completed: boolean;
}

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: number) => void;
  toggleCompleted: (id: number) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task) =>
    set((state) => ({ tasks: [...state.tasks, task] })),

  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  toggleCompleted: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
}));
