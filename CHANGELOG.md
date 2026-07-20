# Changelog

Notable changes to Bulle. Newest first.

## Unreleased

### Added

- **Counted tasks.** A task can now be a quantity rather than a yes/no: "bodies naissance
  3/6", with a stepper in place of the checkbox. It completes when the count reaches its
  target, and reopens if the count drops back below it. Half a layette is a stock question,
  and a checkbox answers it badly: owning two pyjamas out of six is real work that a tick
  box can only call finished or not started.
  - `Task.target` / `Task.count` and `TaskTemplate.target` (`packages/sdk`).
  - `isCounted`, `taskCount`, `stepTaskCount`, `completeTaskUpdates` in `domain/tasks.ts`.
    `status` stays the single source of truth for done-ness, so readiness, the suggestion
    engine, Ensemble and the post-birth list needed no changes at all.
  - `Stepper` component (`@bulle/ui`), built from the same 24px glyph, 44pt target, `pop`
    and haptic as `Checkbox`.
  - Custom tasks can be counted too: leave the new "Combien ?" field empty for an ordinary
    checkbox, or type a number.

- **"La layette" template** (`tpl-layette`), FR and EN, universal (no country gate). Fifteen
  tasks, fourteen of them counted: bodies 12, pyjamas 11, gigoteuses 3, couches 60, bavoirs
  8, langes 6, chaussettes 5, gants 5, draps housse 4, biberons 6, gilets 3, alèses 2, capes
  2, bonnets 2. Counts are a middle taken from French consumer sources cross-checked against
  the NHS newborn list, and every one is editable the moment it lands on a task: they assume
  a wash every three or four days, and a household washing daily needs about half.
  - The fifteenth task is deliberately boolean. Safe sleep is a rule to know, not a stock to
    build: no blanket, duvet, pillow, bumper or soft toy in the cot before age two, per
    ameli and AFPA. Retail layette lists still sell cot bumpers, so the corpus states the
    official position rather than the shop one.
  - No breast pump line: it is rented on prescription and reimbursed in France, so "buy one"
    would be close to an error. It is a note under the bottles instead.
