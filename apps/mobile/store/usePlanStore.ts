/**
 * Préparer — projects + tasks. The reference store; every future domain copies this shape.
 *
 * Note the two tiers of setter. `setProjects`/`setTasks` are PURE and are the ONLY thing
 * the hydrate and remote-apply paths touch. Everything else goes through `syncedSlice`,
 * which persists and notifies. Mixing the two causes an infinite sync echo — see
 * lib/synced-slice.ts.
 */
import { create } from 'zustand';
import type { Project, Task } from '@bulle/sdk';
import { syncedSlice } from '@/lib/synced-slice';

export const PROJECTS_KEY = 'projects';
export const TASKS_KEY = 'tasks';

interface PlanState {
  projects: Project[];
  tasks: Task[];

  // ─── Pure setters — hydrate / remote-apply only. Never notify. ─────────────
  setProjects: (projects: Project[]) => void;
  setTasks: (tasks: Task[]) => void;

  // ─── Mutators — user actions. set → persist → notifySync. ──────────────────
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  removeProject: (id: string) => void;

  addTask: (task: Task) => void;
  addTasks: (tasks: Task[]) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  removeTask: (id: string) => void;

  /** Instantiating a template writes a project and its tasks in one go. */
  addProjectWithTasks: (project: Project, tasks: Task[]) => void;
  /** Removing a project takes its tasks with it — an orphan task is unreachable. */
  removeProjectCascade: (id: string) => void;
}

export const usePlanStore = create<PlanState>((set, get) => {
  const projects = syncedSlice<Project>(
    PROJECTS_KEY,
    () => get().projects,
    (items) => set({ projects: items }),
  );
  const tasks = syncedSlice<Task>(
    TASKS_KEY,
    () => get().tasks,
    (items) => set({ tasks: items }),
  );

  return {
    projects: [],
    tasks: [],

    setProjects: (items) => set({ projects: items }),
    setTasks: (items) => set({ tasks: items }),

    addProject: projects.add,
    updateProject: projects.update,
    removeProject: projects.remove,

    addTask: tasks.add,
    addTasks: tasks.addMany,
    updateTask: tasks.update,
    removeTask: tasks.remove,

    addProjectWithTasks: (project, newTasks) => {
      projects.add(project);
      tasks.addMany(newTasks);
    },

    removeProjectCascade: (id) => {
      tasks.replaceAndSync(get().tasks.filter((t) => t.projectId !== id));
      projects.remove(id);
    },
  };
});
