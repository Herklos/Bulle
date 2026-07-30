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
import React, { useMemo, useState } from 'react';
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
import { Glyph, type GlyphName } from '@bulle/ui/primitives';
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
  const { space, touch } = useBulleTheme();
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

  // "Plus tard" is the whole rest of the catalogue — the file's own docstring says a flat
  // list of 40 items is a backlog, and a backlog is dread. So it stays collapsed by default:
  // the door is always visible (the header + a "Afficher" action), but the screen does not
  // dump the catalogue the moment you scroll past the suggestions. Opening it is one tap.
  const [showLater, setShowLater] = useState(false);

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
   * It used to be a sage-tinted pill — on EVERY row, running down the right rail. A column of
   * identical filled chips is the single loudest "generic cozy-startup template" tell on the
   * whole screen (§15.0), and the pill was a fake button besides (`pointerEvents: none` — it
   * looked pressable but the Row owned the press). Both states are now line-weight, no box:
   *
   *  - addable → a lone sage `plus`, matching the chevron system on the project rows above
   *    (chevron = open, plus = add). The Row still owns the press.
   *  - locked (premium) → the words "Avec Complète" in sage. Differentiating by KIND — a plus
   *    vs a short phrase — is what makes a gated row legible at a glance, now that neither
   *    wears a box. Stated BEFORE the tap so the gate never feels like a trap.
   */
  const templateAction = (templateId: string) => {
    const locked = !isPremium && isPremiumTemplate(templateId);
    if (locked) {
      return (
        <Text variant="caption" color="sage" accessibilityLabel={t('plan.premiumTemplate')}>
          {t('plan.premiumTemplate')}
        </Text>
      );
    }
    return <Glyph name="plus" size={20} color="sage" />;
  };

  // Everything the screen can offer, in any section. Gates the orienting subtitle: over a
  // genuinely empty plan the EmptyState speaks instead, and "chaque projet avance à son
  // rythme" over zero projects would be hollow.
  const anything = ordered.length > 0 || suggestions.length > 0 || later.length > 0;

  // One 44px leading slot, shared by every row on the screen so the titles align to a single
  // spine. Project rows already lead with a 44px ProgressRing; template glyphs were bare at
  // 22px, so their titles started ~22px further left and the left edge wandered section to
  // section. Centering the glyph in a touch-min box fixes the spine without adding any chrome.
  const templateLeading = (glyph: GlyphName, color: 'sage' | 'inkSoft') => (
    <View style={{ width: touch.min, alignItems: 'center' }}>
      {/* size 20, matching every other row-leading glyph in the app; 22 was a lone outlier
          even against this screen's own project glyph. The 44 slot aligns the spine regardless
          of glyph size (the slot is ProgressRing-width, not glyph-width). */}
      <Glyph name={glyph} size={20} color={color} />
    </View>
  );

  return (
    <Screen>
      <FeatureWelcomeFor area='plan' visible={welcome.visible} onDismiss={welcome.dismiss} />

      {/* Title and its one orienting line read as a tight pair (space[2]), not two items in
          the screen's 24px rhythm. The subtitle gives Préparer the voice the landing page
          sells ("des projets, pas une liste") and the bare screen never had. Inter, not
          Fraunces: the serif budget stays on the display title alone. */}
      <View style={{ gap: space[2] }}>
        <Text variant="display">{t('plan.title')}</Text>
        {anything && (
          <Text variant="body" color="inkSoft">
            {t('plan.intro')}
          </Text>
        )}
      </View>

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
                // inkSoft, like the "Plus tard" rows: the category glyph is not the action
                // (the sage plus is), so it should not wear the action colour just because the
                // template is suggested. Keeps sage meaning "act here" and nothing else.
                leading={templateLeading(template.glyph as GlyphName, 'inkSoft')}
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
          <SectionHeader
            title={t('plan.allTemplates')}
            action={{
              label: t(showLater ? 'plan.hideLater' : 'plan.showLater'),
              onPress: () => setShowLater((v) => !v),
            }}
          />
          {showLater &&
            later.map((template, index) => (
              <Row
                key={template.id}
                title={t(template.titleKey)}
                subtitle={template.descriptionKey ? t(template.descriptionKey) : undefined}
                leading={templateLeading(template.glyph as GlyphName, 'inkSoft')}
                trailing={templateAction(template.id)}
                onPress={() => addTemplate(template.id)}
                divider={index < later.length - 1}
              />
            ))}
        </View>
      )}
    </Screen>
  );
}
