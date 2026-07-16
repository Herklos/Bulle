/**
 * Zod schemas for the synced entities.
 *
 * These are not ceremony: a collection doc is decrypted content authored by ANOTHER device,
 * possibly running an older build. Parsing at the hydrate boundary is what stops one
 * malformed peer entity from crashing a screen. Callers use `parseCollection`, which drops
 * bad rows rather than throwing away the whole collection.
 */

import { z } from 'zod';
import { READINESS_DOMAINS } from './types.js';

const iso = z.string().min(1);

export const effortSchema = z.enum(['S', 'M', 'L']);
export const taskStatusSchema = z.enum(['todo', 'done', 'dismissed']);
export const readinessDomainSchema = z.enum(READINESS_DOMAINS);
export const companionshipSchema = z.enum(['couple', 'solo']);
export const memberRoleSchema = z.enum(['co-parent', 'famille', 'doula']);

export const bulleProfileSchema = z.object({
  dueDate: iso,
  dueDateProvisional: z.boolean().optional(),
  firstBaby: z.boolean(),
  companionship: companionshipSchema,
  multiples: z.boolean().optional(),
  gentle: z.boolean().optional(),
  sensitive: z.boolean().optional(),
});

export const pauseStateSchema = z.object({
  paused: z.boolean(),
  pausedAt: iso.optional(),
});

export const bulleSchema = z.object({
  id: z.string(),
  name: z.string(),
  profile: bulleProfileSchema,
  pause: pauseStateSchema,
  birthDate: iso.optional(),
  createdAt: iso,
  updatedAt: iso,
});

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  glyph: z.string(),
  templateId: z.string().optional(),
  order: z.number(),
  createdAt: iso,
  updatedAt: iso,
});

export const taskSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  title: z.string(),
  notes: z.string().optional(),
  weekStart: z.number(),
  weekEnd: z.number(),
  effort: effortSchema,
  domain: readinessDomainSchema,
  essential: z.boolean(),
  status: taskStatusSchema,
  assigneeId: z.string().optional(),
  completedBy: z.string().optional(),
  afterBirthDays: z.number().optional(),
  checklist: z
    .array(z.object({ id: z.string(), label: z.string(), done: z.boolean() }))
    .optional(),
  createdAt: iso,
  updatedAt: iso,
});

export const memoryKindSchema = z.enum(['note', 'milestone']);

export const memorySchema = z.object({
  id: z.string(),
  kind: memoryKindSchema,
  title: z.string().optional(),
  body: z.string().optional(),
  week: z.number().optional(),
  authorId: z.string().optional(),
  createdAt: iso,
  updatedAt: iso,
});

export const eventKindSchema = z.enum(['echo', 'consultation', 'prepa', 'admin', 'autre']);

export const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  kind: eventKindSchema,
  at: iso,
  notes: z.string().optional(),
  createdAt: iso,
  updatedAt: iso,
});

export const memberSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  role: memberRoleSchema,
  subjectUserId: z.string().optional(),
  createdAt: iso,
  updatedAt: iso,
});

/**
 * Parse a decrypted collection, dropping rows that don't validate.
 *
 * Dropping rather than throwing is deliberate: one malformed entity from a peer on a newer
 * build must not blank the user's whole list. The dropped count is returned so the caller
 * can log it instead of failing silently.
 */
export function parseCollection<T>(
  schema: z.ZodType<T>,
  rows: unknown[],
): { items: T[]; dropped: number } {
  const items: T[] = [];
  let dropped = 0;
  for (const row of rows) {
    const parsed = schema.safeParse(row);
    if (parsed.success) items.push(parsed.data);
    else dropped += 1;
  }
  return { items, dropped };
}
