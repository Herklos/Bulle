'use client';
/**
 * Préparer (spec §5.3) — PROJECTS with progress rings, not a task list.
 *
 * The distinction is the design. A flat task list of 40 items is a backlog, and a backlog
 * is a source of dread. Six projects with rings is a shape you can read in a second.
 *
 * Progress counts ESSENTIAL tasks only; optional ones show as "+N idées" and never enter
 * the denominator, so adding ideas can't make you look further behind.
 */
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  currentWeekSA,
  instantiateTemplate,
  projectProgress,
  randomId,
  sortProjects,
  suggestTemplates,
  templatesForLocale,
  templateById,
} from '@bulle/sdk';
import { EmptyState, ProgressRing, Row, SectionHeader, Text } from '@bulle/ui/components';
import { Glyph, type GlyphName } from '@bulle/ui/primitives';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { usePlanStore } from '@/store/usePlanStore';
import { useBulleStore } from '@/store/useBulleStore';
import { useNow } from '@/lib/use-now';
import { useCanEdit } from '@/lib/permissions/usePermissions';

export default function PlanScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { space } = useBulleTheme();
  const now = useNow();

  const bulle = useBulleStore((s) => s.bulle);
  const projects = usePlanStore((s) => s.projects);
  const tasks = usePlanStore((s) => s.tasks);
  const addProjectWithTasks = usePlanStore((s) => s.addProjectWithTasks);
  const canEdit = useCanEdit('plan');

  const weekSA = bulle ? currentWeekSA(bulle.profile.dueDate, now) : 0;

  const suggestions = useMemo(() => {
    if (!bulle) return [];
    const available = templatesForLocale(i18n.language);
    const instantiated = new Set(
      projects.map((p) => p.templateId).filter((id): id is string => !!id),
    );
    return suggestTemplates(available, instantiated, weekSA, bulle.profile);
  }, [bulle, projects, weekSA, i18n.language]);

  const ordered = useMemo(() => sortProjects(projects), [projects]);

  if (!bulle) return null;

  const addTemplate = (templateId: string) => {
    const template = templateById(templateId);
    if (!template) return;
    const { project, tasks: newTasks } = instantiateTemplate(template, bulle.profile, {
      now,
      t: (key) => t(key),
      makeId: () => randomId(),
      order: projects.length,
    });
    addProjectWithTasks(project, newTasks);
  };

  return (
    <Screen>
      <Text variant="display">{t('plan.title')}</Text>

      {ordered.length === 0 && suggestions.length === 0 && (
        <EmptyState glyph="plan" message={t('plan.empty')} />
      )}

      {ordered.length > 0 && (
        <View>
          <SectionHeader title={t('plan.projects')} />
          {ordered.map((project, index) => {
            const progress = projectProgress(project.id, tasks);
            return (
              <Row
                key={project.id}
                title={project.title}
                subtitle={
                  progress.total > 0
                    ? t('plan.progress', { resolved: progress.resolved, total: progress.total }) +
                      (progress.optionalCount > 0
                        ? ` · ${t('plan.ideas', { count: progress.optionalCount })}`
                        : '')
                    : t('plan.noEssentials')
                }
                leading={
                  <ProgressRing fill={progress.fill}>
                    <Glyph name={project.glyph as GlyphName} size={20} color="inkSoft" />
                  </ProgressRing>
                }
                onPress={() => router.push(`/plan/${project.id}` as never)}
                chevron
                divider={index < ordered.length - 1}
              />
            );
          })}
        </View>
      )}

      {/* Suggestions surface ONLY here and on week cards (§5.9) — never as a push. */}
      {canEdit && suggestions.length > 0 && (
        <View>
          <SectionHeader title={t('plan.templates')} />
          {suggestions.map((suggestion, index) => {
            const template = templateById(suggestion.templateId);
            if (!template) return null;
            return (
              <Row
                key={suggestion.templateId}
                title={t(template.titleKey)}
                subtitle={template.descriptionKey ? t(template.descriptionKey) : undefined}
                leading={<Glyph name={template.glyph as GlyphName} size={22} color="sage" />}
                trailing={
                  <Text variant="caption" color="sage">
                    {t('plan.addTemplate')}
                  </Text>
                }
                onPress={() => addTemplate(suggestion.templateId)}
                divider={index < suggestions.length - 1}
              />
            );
          })}
        </View>
      )}

      <View style={{ height: space[4] }} />
    </Screen>
  );
}
