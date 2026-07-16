/**
 * The due-date picker's platform-NEUTRAL parts.
 *
 * This file exists because of a real bug, not tidiness. `DueDatePicker.web.tsx` used to do:
 *
 *     import { defaultDueDate } from './DueDatePicker';
 *     export { defaultDueDate };
 *
 * intending to reach the native file. But platform resolution rewrites `./DueDatePicker` to
 * `DueDatePicker.web.tsx` ON WEB, so the module imported from ITSELF and re-exported the
 * result: `RangeError: Maximum call stack size exceeded`, thrown from a getter recursing
 * forever. Web onboarding died on the first tap and no bulle could be created at all.
 *
 * A file with no platform variants cannot be rewritten into itself, which is the entire
 * point. Anything shared between `X.tsx` and `X.web.tsx` belongs here rather than in either
 * of them.
 */

export interface DueDatePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
}

/**
 * Roughly 30 weeks out — a plausible mid-pregnancy default, so the picker opens near the
 * answer instead of on today (which is never the answer).
 */
export function defaultDueDate(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 30 * 7);
  return d;
}
