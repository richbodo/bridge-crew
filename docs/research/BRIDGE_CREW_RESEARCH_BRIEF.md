# Bridge Crew Research Brief
### A field scan of two-human + N-agent deliberation, with falsifiable predictions

**Status:** Draft — to be published in the repo, timestamped, *before* any field-scan session runs.
**Companion to:** `BRIDGE_CREW_PLAN.md`
**Background:** [Research synthesis on human-AI deliberation configurations](https://claude.ai/public/artifacts/1159dda9-7cd9-422d-bbc3-c1a3d1f655f4)

## 1. Premise

The research literature on human-AI collaboration has a hole in it. Meta-analytic evidence (Vaccaro, Almaatouq & Malone 2024) shows human-AI combinations lose to the best of either alone on closed decision tasks but gain on open-ended creation tasks, and that gains appear only where humans still outperform AI alone. Multi-agent AI debate without humans frequently fails to beat a single agent, degrading through sycophancy, premature convergence, and homogenization. AI mediation of human groups works well. But the configuration of **two humans steering multiple AI agents in real time on ill-structured problems** has essentially no controlled evidence — it is an empty cell.

This brief does not attempt to fill that cell with a powered study. It defines a **field scan**: a small, cheap, honest pass across many disciplines with a fixed instrument (the Bridge Crew tool and a fixed session protocol), designed to answer a prior question: *where* does this configuration create value, and *what does the value consist of*? The output is a field-fit map and a set of tested predictions — exactly the evidence needed to design a real study later, and exactly the story that makes the tool legible as an instrument rather than a demo.

## 2. Core hypothesis

**H1 (mechanism):** In mixed human-AI deliberation on ill-structured problems, human value concentrates at *wide-error-bar moments* — points where (a) an assumption must be set that no corpus determines, (b) context must be injected that the AI could not have known (lived experience, local knowledge, unwritten disciplinary practice), or (c) a prematurely narrowed option space must be reopened. Fields differ systematically in the density of such moments, and the perceived value of the tool will track that density.

**H2 (configuration):** Two same-field humans extract more value from the agent crew than one human would, because they generate disagreement between themselves that agents can then research, stress-test, and structure — the humans supply the divergence that AI-only debate fails to sustain.

## 3. Falsifiable predictions

Stated before data collection. Each is scored per session; the brief is wrong wherever the data says it is.

**P1 — Field ranking.** Perceived value (composite of return intent + direction-change events, §6) will rank fields by verifiability and context-dependence, roughly: *social policy / planning / law / clinical practice / business strategy* (highest) > *history / philosophy / ecology* (high-mid) > *software architecture / engineering design* (mid) > *pure mathematics / formal logic* (lowest). **Falsified if** a formal-verification field lands in the top third, or a contested-context field lands in the bottom third, of the observed ranking.

**P2 — Context-injection density predicts value.** The per-session count of tagged context-injection moments (§5) will correlate positively with return intent. **Falsified if** the sessions with the fewest context injections show equal or higher return intent than those with the most.

**P3 — The debate is with the humans, not beside them.** In sessions rated valuable by participants, ≥50% of Advocate/Skeptic turns will be directed at or answered by a human (questions to humans, human rebuttals) rather than agent-to-agent exchanges. **Falsified if** valuable sessions are dominated by agent-to-agent volleys the humans merely watch.

**P4 — Reopening beats confirming.** Direction changes in the session's working document will more often follow option-reopening events (a human or the convergence watchdog breaking an emerging consensus) than follow agent contributions that confirmed the humans' existing lean. **Falsified if** confirming contributions drive as many or more direction changes.

**P5 — Pairs beat singles.** In the small subset where comparison is possible (same field, one paired session vs. one expert+facilitator session), paired sessions will show more human-human disagreements surfaced and more summons issued per 30 minutes. **Falsified if** singles match pairs on both counts. *(Weakest prediction — smallest n; report honestly as anecdote-grade.)*

**P6 — Floor control is load-bearing.** Participants will use steering actions (grant, dismiss, stop, redirect, barge-in) at least 5 times per 30-minute session on average, and post-session comments will reference control positively. **Falsified if** steering actions are rare (<2/session) and sessions still rate as valuable — which would suggest the hand-raise architecture is ceremony, not value.

**P7 — The artifact is the retention hook.** Participants who ask for the export bundle will show higher return intent than those who don't. **Falsified if** artifact requests and return intent are unrelated.

## 4. Method

**Design.** Comparative multiple-case study with a fixed instrument. ~10 sessions, each a *pair of graduate students (or comparable practitioners) from the same field*, spanning maximally contrasted disciplines along the verifiability/context spectrum (target list: pure math or formal logic; software architecture; ecology or conservation; clinical medicine or nursing; law; urban planning; business strategy; history; philosophy; social policy — adjust to who actually says yes). Participants choose their own live question from within their field; canned topics are prohibited because they measure the demo, not the tool.

**Recruitment.** Casual and honest: approach pairs in university cafés or common spaces (or recruit online — the tool is fully web-based, so sessions can run from anywhere in the world), explain the project in one minute, verify field and level informally (student ID or a two-minute chat), and compensate with coffee or a small gift card. Grad students preferred: they can hold a position in their field and know how to argue it.

**Protocol (fixed across all sessions — the protocol is the instrument):**
1. Consent + 2-minute tool orientation (5 min)
2. Humans frame their question and their initial positions; Scribe captures both (5 min)
3. Optional single Scout research run, humans' choice (5–10 min, agents work while humans keep talking)
4. One Advocate/Skeptic round on the framed question, humans steering (15 min)
5. Debrief: what changed, what they'd use it for, would they come back (5 min)
Total ≈ 35–45 min. Session order is recorded; facilitator improvement over the series is a known confound and is reported, not hidden.

**Configuration note.** The primary cell is pair + crew. Where only a single expert is available, run expert + facilitator-as-second-human and label the session as the weaker cell. Never pool the two cells silently.

**Consent and ethics (open task, not solved here).** Requirements must be researched for the actual jurisdiction(s) and contexts used — NZ vs. elsewhere, public café vs. university campus (some institutions restrict recruiting their students on-site without approval), in-person vs. online (online sessions make the participants' local rules relevant, not just the facilitator's). Regardless of venue: written consent covering recording, anonymized quoting, and publication of aggregated findings; recording indicator always visible; participants may stop and withdraw their transcript at any time; store consent records linked via `consent_ref`. Write the consent form to the strictest standard plausibly needed later, so nothing collected in the scan becomes unusable if this graduates to institution-reviewed research.

## 5. Tagging scheme (post-session analysis pass)

Applied to each transcript using the in-app tagging view (`session_tags`), by the facilitator, ideally spot-checked by one other person for a subset:

- **context_injection** — a human supplies field-specific or situational knowledge absent from the corpus and the agents' outputs (the H1 core tag)
- **assumption_set** — a human resolves an underdetermined variable by decision rather than evidence
- **option_reopen** — a human or the watchdog breaks an emerging convergence and widens the option space
- **direction_change** — the working document's direction visibly changes (Scribe decision log is the ground truth)
- **convergence_break** — the watchdog glowed and a human acted on it

Tag counts per session, per field, are the raw material of the field-fit map.

## 6. Measures

**Logged automatically by the tool:** summons per session; hand-raise grant vs. dismiss rate; stop/redirect counts; barge-in (duck/yield) events; contribution → direction-change linkage; watchdog glows and responses; session overrun beyond the scheduled end (one of the most honest engagement signals available).

**Behavioral outcome proxy — return intent, measured by action not survey:** did they request the export bundle; did they email afterward; did they ask to run another session or bring a colleague. Satisfaction surveys are excluded by design: everyone is polite to the person who bought the coffee.

**Debrief notes:** three fixed questions only (what changed your thinking, if anything; what was annoying; would you use this for real work in your field — for what task).

## 7. Outputs

1. **The field-fit map** — one page: fields × (context-injection density, steering intensity, direction changes, return intent), with the P1 ranking compared against observation.
2. **Prediction scorecard** — P1–P7, each marked supported / falsified / inconclusive, with the session-level evidence.
3. **A write-up** (blog post / DWebCamp talk / workshop-paper-shaped artifact) presenting the map, the scorecard, and the protocol as a reusable instrument, alongside the open-source tool.
4. **A designed next study** — whichever field(s) top the map become the setting for a proper comparison (2+crew vs. 1+crew vs. crew-alone) with real baselines, sized with what the scan taught about effect directions and measurement.

## 8. Honest limits

n≈10 with self-selected participants, one facilitator, an evolving facilitator skill level, and behavioral proxies instead of ground-truth outcome quality. Nothing here estimates effect sizes or supports causal claims. The scan's job is narrower and fully achievable at this size: rank fields by observed fit, test directional predictions stated in advance, and produce the instrument + map that make the real study designable. Where the data embarrasses the predictions, the embarrassment is the finding.

---
*Drafted 2026-08-15 with Claude (Fable 5). Publish before first session; do not edit predictions after data collection begins — append corrections instead.*
