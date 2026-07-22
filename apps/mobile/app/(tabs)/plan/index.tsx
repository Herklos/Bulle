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
import { Redirect, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  currentWeekSA,
  instantiateTemplate,
  projectProgress,
  randomId,
  sortProjects,
  suggestTemplates,
  templatesFor,
  templateById,
} from '@bulle/sdk';
import { EmptyState, ProgressRing, Row, SectionHeader, Text } from '@bulle/ui/components';
import { Glyph, withAlpha, type GlyphName } from '@bulle/ui/primitives';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { FeatureWelcomeFor, useFeatureWelcome } from '@/lib/feature-welcomes';
import { usePlanStore } from '@/store/usePlanStore';
import { useBulleStore } from '@/store/useBulleStore';
import { useNow } from '@/lib/use-now';
import { useCanEdit } from '@/lib/permissions/usePermissions';
import { CONCERN_TEMPLATE_ORDER } from '@/lib/concerns';
import { needsPremiumForProject, needsPremiumForTemplate, isPremiumTemplate } from '@/lib/premium';
import { usePremiumStore } from '@/store/usePremiumStore';
import { useSettingsStore } from '@/store/useSettingsStore';

export default function PlanScreen() {
  const { t, i18n } = useTranslation();
  const welcome = useFeatureWelcome('plan');
  const router = useRouter();
  const { colors, space, radius } = useBulleTheme();
  const now = useNow();

  const bulle = useBulleStore((s) => s.bulle);
  const projects = usePlanStore((s) => s.projects);
  const tasks = usePlanStore((s) => s.tasks);
  const addProjectWithTasks = usePlanStore((s) => s.addProjectWithTasks);
  const canEdit = useCanEdit('plan');

  const weekSA = bulle ? currentWeekSA(bulle.profile.dueDate, now) : 0;

  const concern = useSettingsStore((s) => s.concern);
  const isPremium = usePremiumStore((s) => s.isPremium);

  /**
   * Every template that applies and is not already in the plan.
   *
   * templatesFor, NOT templatesForLocale: the latter ignores appliesTo and leaks the twins
   * template to a single pregnancy and the solo template to a couple.
   */
  const available = useMemo(() => {
    if (!bulle) return [];
    const instantiated = new Set(
      projects.map((p) => p.templateId).filter((id): id is string => !!id),
    );
    return templatesFor(i18n.language, bulle.profile).filter((tpl) => !instantiated.has(tpl.id));
  }, [bulle, projects, i18n.language]);

  const suggestions = useMemo(() => {
    if (!bulle) return [];
    const instantiated = new Set(
      projects.map((p) => p.templateId).filter((id): id is string => !!id),
    );
    const ranked = suggestTemplates(available, instantiated, weekSA, bulle.profile);

    // Float the templates matching the onboarding concern to the top (§5.12 q5). The engine
    // already ordered by week, which is the correct default; this only re-ranks WITHIN what
    // it proposed, so answering "l'administratif" can never surface a template that is not
    // due yet.
    const preferred = CONCERN_TEMPLATE_ORDER[concern] ?? [];
    if (preferred.length === 0) return ranked;
    return [...ranked].sort((a, b) => {
      const ai = preferred.indexOf(a.templateId);
      const bi = preferred.indexOf(b.templateId);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });
  }, [bulle, projects, weekSA, available, concern]);

  /**
   * Everything applicable that the week-ranking did not surface.
   *
   * suggestTemplates only proposes what opens within ~4 weeks, which is right for keeping
   * the screen calm but wrong as the ONLY door to the catalogue: early in a pregnancy — and
   * in EN, which ships without the FR admin module (§7.1) — nothing qualifies, so Préparer
   * rendered an empty state telling you to add a project and gave you no way to add one.
   * The ranking decides the ORDER; it must never decide what exists.
   */
  const later = useMemo(() => {
    const suggested = new Set(suggestions.map((s) => s.templateId));
    return available.filter((tpl) => !suggested.has(tpl.id));
  }, [available, suggestions]);

  const ordered = useMemo(() => sortProjects(projects), [projects]);

  if (!bulle) return null;
  // Pause (§3.1). Préparer is a preparation surface — week-ranked templates for a birth that
  // may not come. It must never render after a loss, exactly like Aujourd'hui and the Chemin.
  if (bulle.pause.paused) return <Redirect href="/pause" />;

  const addTemplate = (templateId: string) => {
    const template = templateById(templateId);
    if (!template) return;

    /**
     * The gate sits HERE, at the value moment (§10) — the instant someone reaches for the
     * Admin FR template or their third project — rather than on a generic upgrade screen.
     * They already know what they wanted, so the paywall can name it.
     */
    if (needsPremiumForTemplate(templateId, isPremium)) {
      router.push('/paywall?reason=adminTemplate');
      return;
    }
    if (needsPremiumForProject(projects, isPremium)) {
      router.push('/paywall?reason=projectLimit');
      return;
    }

    const { project, tasks: newTasks } = instantiateTemplate(template, bulle.profile, {
      now,
      t: (key) => t(key),
      // returnObjects, so a detailsKey resolves to its array of paragraphs rather than to
      // "[object Object]". Guarded: i18next hands back the KEY on a miss, and a detail body
      // reading "templates.valise.tasks.docsDetails" would be worse than none at all.
      tList: (key) => {
        const value = t(key, { returnObjects: true });
        return Array.isArray(value) ? (value as string[]) : [];
      },
      makeId: () => randomId(),
      order: projects.length,
    });
    addProjectWithTasks(project, newTasks);
  };

  /**
   * The trailing affordance on a template row.
   *
   * A pill, not a sentence. "Ajouter à Préparer" spent three words and a wrapped line to say
   * what a button says by being one, and it read as a label rather than an action — so the
   * row looked inert. "à Préparer" was redundant besides: these sit under Modèles, inside
   * the Préparer tab. The Chanel rule takes the other two words.
   *
   * `pointerEvents: none` is deliberate. The Row already owns the press, so a real nested
   * Pressable would put a button inside a button — two overlapping targets, and VoiceOver
   * announcing both. This looks like the button and lets the whole row be the target.
   */
  const templateAction = (templateId: string) => {
    // Say it is premium BEFORE the tap. A gate that only appears after you reach for
    // something feels like a trap, even when the price is fair.
    const locked = !isPremium && isPremiumTemplate(templateId);
    if (locked) {
      // The same text-pill as the unlocked branch, with the premium label. Stated in visible
      // text, not a done-looking checkmark that reads as "already added".
      return (
        <View
          accessible
          accessibilityLabel={t('plan.premiumTemplate')}
          style={{
            paddingHorizontal: space[3],
            paddingVertical: space[2],
            borderRadius: radius.s,
            backgroundColor: withAlpha(colors.sage, 0.12),
          }}
        >
          <Text variant="caption" color="sage">
            {t('plan.premiumTemplate')}
          </Text>
        </View>
      );
    }
    return (
      <View
        pointerEvents="none"
        style={{
          paddingHorizontal: space[3],
          paddingVertical: space[2],
          borderRadius: radius.s,
          backgroundColor: withAlpha(colors.sage, 0.12),
        }}
      >
        <Text variant="caption" color="sage">
          {t('plan.addTemplate')}
        </Text>
      </View>
    );
  };

  return (
    <Screen>
      <FeatureWelcomeFor area='plan' visible={welcome.visible} onDismiss={welcome.dismiss} />
      <Text variant="display">{t('plan.title')}</Text>

      {/* Only when there is genuinely nothing to offer — never while templates exist. */}
      {ordered.length === 0 && suggestions.length === 0 && later.length === 0 && (
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
                trailing={templateAction(suggestion.templateId)}
                onPress={() => addTemplate(suggestion.templateId)}
                divider={index < suggestions.length - 1}
              />
            );
          })}
        </View>
      )}

      {/*
        The rest of the catalogue. Quieter than the suggestions above it — these are not due
        yet — but always reachable, so the plan is never a locked room.
      */}
      {canEdit && later.length > 0 && (
        <View>
          <SectionHeader title={t('plan.allTemplates')} />
          {later.map((template, index) => (
            <Row
              key={template.id}
              title={t(template.titleKey)}
              subtitle={template.descriptionKey ? t(template.descriptionKey) : undefined}
              leading={<Glyph name={template.glyph as GlyphName} size={22} color="inkSoft" />}
              trailing={templateAction(template.id)}
              onPress={() => addTemplate(template.id)}
              divider={index < later.length - 1}
            />
          ))}
        </View>
      )}

      <View style={{ height: space[4] }} />
    </Screen>
  );
}
