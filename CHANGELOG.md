# Changelog

Notable changes to Bulle. Newest first.

## Unreleased

### Fixed

- **"Vous êtes prêts" was structurally unreachable outside France.** `isFullyPrepared` gated
  on `sante`, `administratif` and `maison` all having `total > 0`, but no universal template
  produces a single `sante` task — they come only from `tpl-admin-fr` and `tpl-decisions`,
  both `countries: ['FR']`. A bulle in Brussels could resolve every task it had ever been
  offered and still never reach the second of the product's only two celebration moments,
  judged against templates it was never shown. Now every gated domain the bulle *has* must
  be complete, with at least two present — which keeps the moment scarce while making it
  winnable in any market.
- The third échographie's window (32-34 SA per its own copy) ended after its task's
  `weekEnd` of 32, so the task closed before the last appointment it describes.

### Added

- **Two more task shapes, taking the model to four.**
  - **Checklist.** The field was declared in `types.ts` and the zod schema and had never
    been written or rendered — meanwhile the corpus wrote its checklists as prose for want
    of anywhere to put them. Now live on the maternity-bag documents, the toilet bag, both
    hospital bags, and the sibling box. `toggleChecklistItem` derives `status` from the
    items, exactly as `stepTaskCount` does, so nothing downstream had to learn about it.
  - **Choice.** A decision between mutually exclusive branches, which fixes a real defect:
    `tpl-garde` instantiated all nine of its tasks whatever childcare route you took,
    including `cmg`, which only exists for the employer routes. The copy even told users to
    pursue two alternatives in parallel because the model could not say they were
    alternatives. Answering now prunes the branches not taken to "pas pour nous", and
    changing your mind restores them — a childcare decision made in month four is routinely
    revisited in month seven.
- **Targets on the occurrence tasks**, which the new count shape already covered and nobody
  had applied: 7 consultations prénatales, 3 échographies, 10 séances de rééducation, 3
  rights-opening examens. Each was a numeral in a title resolved by a single checkbox.
- **`tpl-pnp` — Préparation à la naissance.** The largest hole in the corpus: the entretien
  prénatal précoce has been mandatory since 2020 and reimbursed at 100%, the 8 PNP sessions
  are covered from the 6th month, and neither appeared anywhere. FR-only. Also carries the
  HAS coqueluche recommendation and the cocooning boosters, both written as "raise it at a
  consultation" rather than as advice (§7.3). This roughly doubles the `sante` domain, which
  was the least-used in the product at 6 tasks.
- **`tpl-fratrie` — La fratrie.** Gated on `firstBaby === false`, the first template to use
  that axis at all. Universal, FR and EN: a sibling is not a French institution, so tagging
  it `countries: ['FR']` to satisfy a lint would have been the language-versus-country
  conflation the rest of the file exists to prevent.

- **Manual count entry, with no new controls.** The two digits in the stepper are each their
  own tap target: tap one, type over it, done. Tapping ten times to record a bag of
  hand-me-downs was a small indignity, and a "modifier" button next to a stepper would have
  been a second control competing with the one already there. The target is editable the
  same way, because the shipped figures assume a wash every three or four days and a target
  the user cannot move is a number arguing with the person who owns the cupboard.
  - `setTaskCount` / `setTaskTarget` (`domain/tasks.ts`), both routed through
    `stepTaskCount` so there is exactly one place where "count reached target" becomes
    "done". An empty or junk field keeps the old value rather than writing 0.
- **Ignoring an item is now a toggle and reachable from the task screen.** "Pas pour nous"
  existed only in the list's overflow menu and was one-way, so a row dismissed by mistake
  could not be recovered and opening a task to dismiss it was a dead end. An ignored counted
  row dims rather than disappearing, so the decision stays visibly reversible.
- **Three more counted items on the layette** from a gap check against Aubert, Little
  Crevette and Consobaby's full checklists: spare teats (3), breast pads (6, breastfeeding
  only), scratch mittens (2). The room, cot, changing point, car seat, pram and toilet bag
  were already covered by the Nid and Achats templates, and the equipment those lists call
  optional (transat, babyphone, baignoire, stériliser) stays out on purpose.

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

- **Seven blog articles on quantities** (`blog-posts-layette.ts`), FR and EN, from the same
  research: the reference piece, nappies per day, newborn vs 1 month sizing, how many of
  each to put on a baby list, what to give as a gift, hospital bag quantities, and what the
  season actually changes. They fill a real gap: French layette guides list what to buy and
  almost never how many, which is the only part a first-time parent cannot work out alone.
  - Scheduled 26 Aug to 16 Sep 2026, inserted after the launch sequence rather than
    appended. Inserting normally costs ranking history; it cost nothing here because the
    calendar is on day 0 and only the first article had published. That window closes as
    the calendar advances.

- **Five more articles on seasons and sizes**, taking the run to twelve (26 Aug to 5 Oct
  2026): the TOG guide, quantities per size from birth to one year, and one article each
  for a winter, summer and mid-season birth. Hub and spoke: the existing season article
  says what changes, these say what to actually own.

- **A 3-month band on the layette template**: bodies 9, pyjamas 7, gigoteuses 2. Optional,
  window 36 to 41, and the copy says plainly not to buy them. They exist because gifts
  arrive in 1 and 3 month sizes across the whole third trimester and "how many do we
  already have" had nowhere to live. Nothing beyond 3 months was added: a pregnancy app
  sending someone shopping for clothes the baby wears in October is the overbuying this
  corpus argues against, and that belongs in the articles instead.
