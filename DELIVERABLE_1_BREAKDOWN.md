# AeroRisk — Deliverable 1 Breakdown (CEN 4010, FIU)

This document distills the three governing artifacts for Deliverable 1 into a per-person task list so the team can divide and conquer.

The three governing artifacts are:

1. **`Format-Present-Deliver-1`** — defines what the 30-minute Presentation 1 must contain (20 min talk + 10 min Q&A).
2. **`GradeSheet_Present-Deliver-1`** — defines how Presentation 1 is graded (25 pts total).
3. **`1.CEN4010-SRD`** — defines the Software Requirements Document (SRD) that backs the presentation. Deliverable 1 corresponds to chapters 1–5 of that SRD, scoped down to what is actually required for the first presentation.

Roles (from the proposal):

| # | Role | Member | D1 Admin Role |
|---|------|--------|---------------|
| P1 | Frontend | Uriel Zeledon | — |
| P2 | Backend | Rodrigo Bicho Moraes | — |
| P3 | Fault Tree Engine | Jada Rivera | **Time Keeper** |
| P4 | Monte Carlo | Daniel Fraga | — |
| P5 | Integration | Luna Irizarry | **Team Leader** |
| P6 | Testing & Docs | Giovanna Schiraldi | **Minute Taker** |

---

## 0. Team-wide deliverables (must exist before the presentation)

These are produced collaboratively. Whoever is listed first owns coordination; everyone is on the hook for content.

| Item | Owner | Contributors | Source of requirement |
|------|-------|--------------|------------------------|
| Cover slide (system name, members, roles, date) | Luna (Team Lead) | All | Format §1, Grade §Cover |
| Purpose & scope slide | Luna | All | Format §2 |
| Project schedule slide (Gantt or PERT — for D1 only) | Luna + Giovanna | All | Format §3, Grade §Schedule |
| Top-level **package-level** use-case diagram (everything in the system) | Giovanna (modeler) | All write UCs | SRD §4.2 |
| **Implementation** use-case diagram (the 7 UCs we'll actually build, incl. login + logout + 3 security UCs) | Giovanna | All | SRD §4.2, Format §4 |
| Combined class diagram for the 7 implemented UCs | Giovanna | Each member supplies the slice for their 3 UCs | SRD §5.2 |
| 7 sequence diagrams (one per implemented UC) | Giovanna | Each member draws theirs | SRD §5.3 |
| UI mockups for the 2 use cases presented + the 7 implemented UCs (Appendix B in SRD) | Each member draws their own (Figma/Axure) | — | Format §6, SRD §5/Appendix B |
| Picking the 7 use cases to implement (from the 18 total) | Luna runs the vote | All | SRD §4.2 |
| Rehearsal | Luna calls it | All | Format guidelines |
| Booking the 30-min presentation slot with the instructor | Luna | — | Format bullet 2 |

> The SRD says "Each team must identify a modeler to create all the diagrams for the team. It is very difficult to merge individual team diagrams." Giovanna (P6 Testing & Docs) is the natural modeler since she already owns documentation, but the team should formally confirm this in the next meeting.

---

## 1. Per-person deliverables

Each member must produce, for the SRD body:

- **3 use cases** written using the course's UC template (Actor, Pre-conditions, Description, Post-conditions, Alternative Courses, Exceptions, Related Use Cases, Decision Support: Frequency / Criticality / Risk, Constraints / Non-Functional Requirements, Modification History).
- **1 of those 3 must be a security use case** that addresses a misuse case.
- **A use-case diagram covering their 3 UCs.**
- **3 scenarios** (concrete instances of their 3 UCs).
- **A class diagram slice** for their 3 UCs (will be merged by the modeler).
- **3 sequence diagrams** (one per UC).
- **UI mockups** for any of their UCs that are in the implementation set of 7.

For the presentation (per Format §5/§6/§7), the team collectively shows **2 use cases including 1 security UC** with NFRs, UIs, and the requirements-analysis UML. These 2 are picked from the team's combined 18 UCs — they do **not** all have to come from the same person. Everyone presents some portion (Format guideline: "Each member of the team must take part in presenting the material").

### P1 — Uriel Zeledon (Frontend)

Likely UC slice (project-canonical functional requirements #5, #6, #9, #11):

- UC-F1: **Create a new risk-model project** (name, description, mission context).
- UC-F2: **Build a fault tree on a drag-and-drop canvas** (add components, failure events, AND/OR gates).
- UC-F3 (security): **Prevent cross-project canvas tampering** — e.g., enforce that a logged-in user can only mutate canvases belonging to a project they own or are shared on; misuse case = forged project ID in PATCH request.

Per-person deliverables: 3 UC writeups, 3 scenarios, UC diagram, class-slice, 3 sequence diagrams, Figma UIs for any of his UCs that land in the implemented-7.

### P2 — Rodrigo Bicho Moraes (Backend)

Likely UC slice (functional requirements #1, #2, #3, #4 + persistence for #5, #9):

- UC-B1: **Register for an account** (functional req #1).
- UC-B2: **Update profile** (name, organization, engineering discipline — functional req #4).
- UC-B3 (security): **Log in with brute-force protection** — misuse case = credential stuffing; controls = rate limit, lockout, audit log. (Login itself is one of the 3 required security UCs at the implementation level.)

Per-person deliverables: same set of 3 UCs + diagrams + sequences + UIs.

### P3 — Jada Rivera (Fault Tree Engine) — *Time Keeper for D1*

Likely UC slice (functional requirement #7 + #9):

- UC-T1: **Input failure probabilities and compute top-level failure probability** (analytical engine over the fault tree).
- UC-T2: **Save / load / version a risk model** (functional req #9 — touches the shared data model that P4 also consumes).
- UC-T3 (security): **Audit-log every probability edit** so that tampering with a saved model is detectable; misuse case = silent edit of a saved model by an insider.

Per-person deliverables: 3 UC writeups, scenarios, UC diagram, class-slice (importantly: the canonical shared fault-tree data model — components, events, gates, edges), 3 sequence diagrams, UI mockups.

### P4 — Daniel Fraga (Monte Carlo) — *(see §2 below for the full deep dive)*

Likely UC slice (functional requirement #8):

- UC-MC1: **Run a Monte Carlo simulation** over a fault tree (configurable N trials).
- UC-MC2: **Run a sensitivity analysis** (sweep one component's failure probability and chart the change in top-level risk).
- UC-MC3 (security): **Authorize and rate-limit simulation jobs** — misuse case = an authenticated but malicious/abusive user spamming 10⁹-trial jobs to DOS the compute pool, or requesting simulations against projects they don't own.

### P5 — Luna Irizarry (Integration) — *Team Leader for D1*

Likely UC slice (functional requirements #10, #11):

- UC-I1: **Export risk analysis results as a formatted PDF report** (functional req #10).
- UC-I2: **Share a project with another registered user and collaborate in real time** (functional req #11).
- UC-I3 (security): **Permission model for shared projects** — misuse case = a collaborator with read-only access invoking a write API directly (bypassing the UI). Controls = server-side role check on every write, signed share tokens.

Per-person deliverables + leader duties (schedules meeting, owns cover/scope/schedule slides, runs rehearsal).

### P6 — Giovanna Schiraldi (Testing & Docs) — *Minute Taker for D1*

Likely UC slice (functional requirement #12 + cross-cutting):

- UC-D1: **Browse and instantiate a NASA mission template** (functional req #12).
- UC-D2: **Log out** (functional req #3 — one of the mandatory security UCs at the implementation level).
- UC-D3 (security): **Session timeout / forced re-auth on sensitive ops** — misuse case = an attacker resuming an unattended browser session to export a confidential report.

Per-person deliverables + team-modeler duties (consolidating UC diagram, class diagram, all sequence diagrams) + minutes for every meeting (which feed Appendix C of the SRD).

---

## 2. Mapping individual UCs → the 7 implemented UCs

The SRD requires **exactly 7 implemented UCs**, of which **3 must be security UCs**, and login + logout are mandatory. Suggested ballot for the team meeting:

| # | UC | Owner | Security? | Justification |
|---|----|-------|-----------|---------------|
| 1 | Log in (with brute-force protection) | P2 | ✅ | Mandatory |
| 2 | Log out (with session invalidation) | P6 | ✅ | Mandatory |
| 3 | Build a fault tree (drag-and-drop canvas) | P1 | — | Core differentiator |
| 4 | Compute top-level failure probability | P3 | — | Core engine |
| 5 | Run Monte Carlo simulation | P4 | — | Core engine #2 |
| 6 | Share a project + permission enforcement | P5 | ✅ | 3rd required security UC |
| 7 | Browse NASA mission template | P6 | — | Demo / "wow" feature |

This selection covers all six members, hits 3 security UCs (login, logout, permission enforcement), and lets the **2 presented UCs** be e.g. "Run Monte Carlo simulation" (non-security) + "Share a project" (security).

---

## 3. Submission checklist (in the order things must be done)

1. Team meeting: confirm modeler, lock the 7 implemented UCs, lock who presents which slide.
2. Every member writes their 3 UCs in the template → push to repo under `docs/srd/usecases/<member>/`.
3. Every member produces UI mockups for any of their UCs in the implemented-7 → `docs/srd/ui/<member>/`.
4. Modeler consolidates: top-level UC diagram, implementation UC diagram, class diagram, 7 sequence diagrams → `docs/srd/diagrams/`.
5. Luna assembles the slide deck per Format §1–§9.
6. Full rehearsal (Format requires it; reading from text = points lost).
7. Submit / present at the scheduled 30-min slot.

