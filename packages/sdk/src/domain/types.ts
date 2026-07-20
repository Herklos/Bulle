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
  /**
   * ISO 3166-1 alpha-2 country whose system this bulle lives under ('FR', 'BE', ...).
   *
   * NOT the language. The two get conflated constantly and it is wrong in both directions:
   * a French speaker in Belgium or Québec must never be handed the CAF, and an
   * English-speaking parent living in Paris very much needs it. Country decides WHICH
   * institutions apply; locale decides which words they are described in.
   *
   * Absent means France, which is the launch market — see `templateAppliesInCountry`.
   */
  country?: string;
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

/** One line of a task's checklist. See `Task.checklist`. */
export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

/** One branch of a choice task. See `Task.options`. */
export interface TaskOption {
  id: string;
  label: string;
}

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
  /**
   * What to actually DO, as paragraphs. Resolved at instantiation like `title`, so it stays
   * editable and survives a language change the same way the rest of the task does.
   *
   * A task title is a reminder, not an instruction: "Rassembler les documents pour la
   * maternité" tells you nothing if you do not already know which documents. This is where
   * the answer lives.
   */
  details?: string[];
  /**
   * ONE official source, already resolved for the bulle's country (see resolveTaskHref).
   *
   * One, deliberately. A task that opens with six links is a research project, and the
   * whole promise is that the app did the reading.
   */
  href?: string;
  /**
   * Max depth 1 by design — a checklist inside a task, never a task tree.
   *
   * The third task shape, after the boolean and the count. It exists for the tasks whose
   * answer is a SET rather than a yes/no or a number: "rassembler les documents" is four
   * specific pieces of paper, and a single checkbox next to it cannot say which three you
   * already have. The corpus had been writing these out as prose in `notes` and `details`
   * for want of anywhere else to put them.
   *
   * Like `count`, this never becomes a second source of truth: `toggleChecklistItem`
   * derives `status` from the items, so everything downstream still reads `status` alone.
   */
  checklist?: ChecklistItem[];
  /**
   * How many of the thing are needed. Present ⇒ this is a COUNTED task: "6 bodies", not
   * "acheter des bodies". Absent ⇒ an ordinary boolean task.
   *
   * Half the layette is a stock question, and a checkbox answers it badly: someone who owns
   * two pyjamas out of six has done real work, and ticking the box would claim they were
   * finished while leaving it unticked claims they had not started. A count says the true
   * thing, and it is the shape the second-hand / gifted / hand-me-down reality of a layette
   * actually takes.
   *
   * `status` stays the single source of truth for done-ness — see `stepTaskCount`. Nothing in
   * readiness, suggestion or Ensemble reads `count`, so a counted task resolves through
   * exactly the same path as every other one.
   */
  target?: number;
  /** How many are already owned. Only meaningful with `target`. Clamped to 0..target. */
  count?: number;
  /**
   * The fourth task shape: a decision between mutually exclusive branches.
   *
   * The corpus is full of these and the model could not hold them, so they were written as
   * prose and the consequences leaked into the user's list. `tpl-garde` instantiates all
   * nine of its tasks whatever childcare route you take, including `cmg`, which only exists
   * for the employer route — and the copy at `garde.assistantsNote` tells you to pursue two
   * alternatives in parallel because there was no way to say they were alternatives.
   *
   * Answering a choice resolves the task AND prunes the branches you did not take, via
   * `applyTaskChoice`. That is the whole point: the decision has to change the list, or it
   * is just a checkbox with extra words.
   */
  options?: TaskOption[];
  /** Which option was taken. Present ⇒ the choice has been made. */
  chosenOptionId?: string;
  /**
   * This task belongs to a branch of another task's choice. Resolved from the template's
   * `choiceKey` at instantiation, when the choice task's real id finally exists.
   */
  branchOfTaskId?: string;
  /** Which branches of `branchOfTaskId` this task belongs to. */
  branchOptionIds?: string[];
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
  /**
   * i18n key resolving to an ARRAY of paragraphs explaining what to do. Resolved to literal
   * strings at instantiation, like `titleKey`.
   */
  detailsKey?: string;
  /**
   * Official source, shown as a link on the task (spec §5.4). Used wherever the template
   * applies, which for a `countries`-tagged template means exactly one country.
   */
  href?: string;
  /**
   * Per-country override, for the templates that apply everywhere but whose source does
   * not. A hospital bag is universal; the page describing what to bring is not.
   *
   * Keyed by ISO 3166-1 alpha-2. Falls back to `href` — see resolveTaskHref. Without this,
   * a universal template could only ever cite one country's institution, which is how you
   * end up linking a parent in Brussels to ameli.fr.
   */
  hrefByCountry?: Record<string, string>;
  /**
   * i18n key resolving to an ARRAY of checklist labels. Resolved at instantiation like
   * `detailsKey`, so the items become literal, editable strings on the Task.
   *
   * Mutually exclusive with `target` in practice: a task is a set or a number, not both.
   */
  checklistKey?: string;
  /**
   * Marks this task as the CHOICE for a branch group, under a name its branches can refer
   * to. A plain string because template authoring happens long before ids exist.
   */
  choiceKey?: string;
  /** i18n key resolving to an ARRAY of option labels. Option ids are `optionIds[i]`. */
  optionsKey?: string;
  /**
   * Stable ids for the options, positionally matched to `optionsKey`'s array.
   *
   * Separate from the labels so that a translation change, or a reworded option, cannot
   * silently repoint every branch in the group at a different answer.
   */
  optionIds?: string[];
  /**
   * This task only applies if `choiceKey`'s answer was one of `optionIds`.
   *
   * A list, not a single option, because real branches overlap: the CMG emploi direct
   * applies to an assistante maternelle AND to garde à domicile, but not to a crèche place.
   * Forcing one option per task would have meant either duplicating the task or shipping it
   * on the wrong branch.
   */
  branchOf?: { choiceKey: string; optionIds: string[] };
  /**
   * See `Task.target`. Present ⇒ the instantiated task is counted, starting at 0.
   *
   * The number is a RECOMMENDATION, not a rule, which is why it lands on an editable task
   * rather than staying template-side: a family with a washing machine running daily needs
   * fewer bodies than one without, and the app must not argue with them about it.
   */
  target?: number;
}

export interface ProjectTemplate {
  id: string;
  /** i18n key — templates are code, so their copy lives in the locale files. */
  titleKey: string;
  descriptionKey?: string;
  glyph: string;
  tasks: TaskTemplate[];
  /**
   * Locales this template has COPY for. Omit when it is offered in every language.
   *
   * This is a translation fact, not a legal one: §7.1 says EN ships without a template
   * rather than with a bad one, and that is all this expresses. Do not use it to mean "this
   * is French" — that is `countries`.
   */
  locales?: string[];
  /**
   * ISO 3166-1 alpha-2 countries whose system this template describes. Omit when it applies
   * anywhere (a hospital bag is a hospital bag).
   *
   * Separate from `locales` because language and country are different questions, and
   * collapsing them is a real bug rather than a tidiness point: matching on language alone
   * hands the CAF, the PAJE and the 5-day mairie deadline to a French speaker in Brussels,
   * Geneva or Montréal, where none of it is true. Adding a country is now: write the copy,
   * tag the template, and nothing else changes.
   */
  countries?: string[];
  /** Omit for templates that apply to every profile. */
  appliesTo?: (profile: BulleProfile) => boolean;
}
