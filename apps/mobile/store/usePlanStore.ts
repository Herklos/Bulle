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
import { getSession } from '@/lib/starfish';

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
  /**
   * Replace the whole list in one write. For edits that are not local to a single task —
   * answering a choice dismisses its unchosen branches (see `applyTaskChoice`), and doing
   * that as N separate updates would push N times and let a peer observe a half-pruned list.
   */
  replaceTasksAndSync: (tasks: Task[]) => void;

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

    /**
     * Stamps `completedBy` when a task leaves `todo`, so Ensemble (§5.1) can tell the
     * partner's work from mine.
     *
     * This lives here rather than at the call sites because it is an invariant of resolving
     * a task, not something each screen should remember. `getSession()` is null when sync
     * is off, which leaves the field absent — correct, since a bulle with no sync has no
     * partner. Only ever reached from the mutator, never from the pure `setTasks` the
     * hydrate path uses, so a pulled task keeps the stamp its author gave it.
     */
    updateTask: (id, updates) => {
      const resolving = updates.status !== undefined && updates.status !== 'todo';
      const userId = getSession()?.userId;
      tasks.update(id, resolving && userId ? { ...updates, completedBy: userId } : updates);
    },

    removeTask: tasks.remove,
    replaceTasksAndSync: tasks.replaceAndSync,

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
