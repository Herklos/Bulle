/**
 * Bulle domain types (spec §4.2).
 *
 * The engine is a project manager; the interface is a companion. These types are the
 * engine — pure data, no React, no Expo, no storage.
 */

/** ISO-8601 date-time string. */
export type Iso = string;

// ─── Profile & sensitive states (spec §3.2) ──────────────────────────────────

/** Who is preparing. Drives copy variants — a solo parent must never see "your partner…" ghosts. */
export type Companionship = 'couple' | 'solo';

/**
 * Optional calibration flags, phrased without clinical labels in the UI (§5.12 q4).
 * `sensitive` covers post-IVF / prior loss: first-trimester content avoids presumptive
 * celebration. `gentle` covers high-risk / bed rest: fewer suggested tasks, readiness
 * reweighted toward delegation.
 */
export interface BulleProfile {
  /** Estimated due date. The only required onboarding answer. */
  dueDate: Iso;
  /** True when the due date is a DDR-based estimate rather than a scan-confirmed date. */
  dueDateProvisional?: boolean;
  firstBaby: boolean;
  companionship: Companionship;
  multiples?: boolean;
  gentle?: boolean;
  sensitive?: boolean;
}

/**
 * Pause mode (§3.1). When paused, the Journey, countdown and readiness disappear and every
 * scheduled notification must be purged — not merely muted. A scheduled "Semaine 24 🎉"
 * firing after a loss is the catastrophic failure case this exists to prevent.
 */
export interface PauseState {
  paused: boolean;
  pausedAt?: Iso;
}

// ─── The bulle root (singleton) ──────────────────────────────────────────────

export interface Bulle {
  id: string;
  /** Display name, e.g. "Notre bulle". */
  name: string;
  profile: BulleProfile;
  pause: PauseState;
  /**
   * The actual birth. Absent until the baby arrives, which is the normal state.
   *
   * This is the ONLY thing that can drive a post-birth deadline. A due date cannot: the
   * baby does not arrive on it, and every French post-birth clock (5 days for the mairie,
   * 6 months for the congé paternité) runs from the real birth, not the estimate. See
   * `afterBirthDays` on Task.
   */
  birthDate?: Iso;
  createdAt: Iso;
  updatedAt: Iso;
}

// ─── Members (spec §5.10) ────────────────────────────────────────────────────

export type MemberRole = 'co-parent' | 'famille' | 'doula';

export interface Member {
  id: string;
  displayName: string;
  role: MemberRole;
  /** Ephemeral subject id from the invite cap — how a role reaches a joined member. */
  subjectUserId?: string;
  createdAt: Iso;
  updatedAt: Iso;
}

// ─── Readiness domains (spec §6) ─────────────────────────────────────────────

export const READINESS_DOMAINS = [
  'sante',
  'maison',
  'achats',
  'administratif',
  'finances',
  'entourage',
  'postpartum',
] as const;

export type ReadinessDomain = (typeof READINESS_DOMAINS)[number];

// ─── Projects & tasks ────────────────────────────────────────────────────────

/** Effort estimate shown on the focus card ("~20 min"), never a due time. */
export type Effort = 'S' | 'M' | 'L';

/**
 * `dismissed` = the user marked "pas pour nous". It counts as resolved in the readiness
 * numerator (§6) — respecting their choice is what keeps the score honest and monotonic.
 */
export type TaskStatus = 'todo' | 'done' | 'dismissed';

/**
 * Tasks live on WEEK-WINDOWS, not calendar dates (spec §4.2). A window reschedules itself
 * when the due date is corrected at an ultrasound, and removes the daily-deadline anxiety
 * of date-based todo apps. Only `Event` carries a real datetime.
 */
export interface Task {
  id: string;
  projectId: string;
  title: string;
  notes?: string;
  /** Gestational week the task opens (inclusive). */
  weekStart: number;
  /** Gestational week the task closes (inclusive). Never renders as a deadline. */
  weekEnd: number;
  effort: Effort;
  domain: ReadinessDomain;
  /** Only essential tasks enter the readiness denominator. Custom tasks default to false. */
  essential: boolean;
  status: TaskStatus;
  assigneeId?: string;
  /**
   * userId of whoever resolved this task, stamped when it leaves `todo`. Feeds the Ensemble
   * module (§5.1) — the only thing it answers is "was this someone other than me?".
   *
   * Absent on tasks resolved before sync was ever on, and on locally-created ones with no
   * session. Absent therefore reads as "me", which is the safe default: Ensemble showing
   * nothing is correct, Ensemble crediting a partner who did nothing is not.
   */
  completedBy?: string;
  /**
   * Deadline in DAYS FROM THE BIRTH, for the tasks that have one.
   *
   * Week-windows are the right model for everything that happens during a pregnancy, and
   * the wrong one for everything after it: a deadline of "5 days from the birth" (Art. 55
   * du Code civil, déclaration de naissance) or "6 months from the birth" (Art. L1225-35,
   * congé paternité) simply cannot be said in semaines d'aménorrhée. These tasks used to
   * carry a 41+ SA window as a display convenience, which put them on the list but gave
   * them no real clock — and the congé paternité is a non-transferable individual right, so
   * a parent who misses the window does not get it back.
   *
   * Present ⇒ the task is a post-birth task: its window is inert and `Bulle.birthDate` is
   * what times it. Absent ⇒ an ordinary week-window task.
   */
  afterBirthDays?: number;
  /** Max depth 1 by design — a checklist inside a task, never a task tree. */
  checklist?: { id: string; label: string; done: boolean }[];
  createdAt: Iso;
  updatedAt: Iso;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  /** Glyph key (see @bulle/ui Glyph) — never an emoji or a raster icon. */
  glyph: string;
  /** Set when instantiated from a template, so a second pregnancy can reuse it. */
  templateId?: string;
  order: number;
  createdAt: Iso;
  updatedAt: Iso;
}

// ─── Events (the only datetime-bearing entity) ───────────────────────────────

export type EventKind = 'echo' | 'consultation' | 'prepa' | 'admin' | 'autre';

export interface BulleEvent {
  id: string;
  title: string;
  kind: EventKind;
  at: Iso;
  notes?: string;
  createdAt: Iso;
  updatedAt: Iso;
}

// ─── Memories (spec §5 — Souvenirs) ──────────────────────────────────────────

/**
 * `photo` and `voice` are deliberately absent for now.
 *
 * A note and a moment are pure text: they sync as ordinary encrypted content and cost the
 * merge model nothing. Media does not — it needs blob storage, a size budget, and its own
 * sync path, and half-shipping it would mean a memory that exists on one parent's phone and
 * silently not the other's. Text first, media when it can be done properly.
 */
export type MemoryKind = 'note' | 'milestone';

export interface Memory {
  id: string;
  kind: MemoryKind;
  title?: string;
  body?: string;
  /** Gestational week this memory belongs to, for the Chemin. */
  week?: number;
  authorId?: string;
  createdAt: Iso;
  updatedAt: Iso;
}

// ─── Templates (instantiated with week-windows relative to the due date) ─────

export interface TaskTemplate {
  /** i18n key; resolved to a literal `Task.title` at instantiation (tasks are editable). */
  titleKey: string;
  notesKey?: string;
  weekStart: number;
  weekEnd: number;
  /** See `Task.afterBirthDays`. Present ⇒ this task is timed by the birth, not the window. */
  afterBirthDays?: number;
  effort: Effort;
  domain: ReadinessDomain;
  essential: boolean;
  /** Official source, shown as a link on the task (spec §5.4). */
  href?: string;
}

export interface ProjectTemplate {
  id: string;
  /** i18n key — templates are code, so their copy lives in the locale files. */
  titleKey: string;
  descriptionKey?: string;
  glyph: string;
  tasks: TaskTemplate[];
  /**
   * Locales this template is offered in. The FR administrative template has no meaningful
   * equivalent elsewhere, and spec §7.1 is explicit that EN ships WITHOUT it rather than
   * with a bad one. Omit for templates that apply everywhere.
   */
  locales?: string[];
  /** Omit for templates that apply to every profile. */
  appliesTo?: (profile: BulleProfile) => boolean;
}
