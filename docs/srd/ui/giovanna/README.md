# AeroRisk — UI Mockups (Giovanna's Use Cases)

Static, browser-viewable UI mockups for **SRD Appendix B**, covering the three use
cases in `Giovanna_UseCases_Deliverable1`:

| File | Use Case | What it shows |
|------|----------|---------------|
| [`index.html`](index.html) | — | Landing page linking all three mockups |
| [`uc-02-logout.html`](uc-02-logout.html) | **UC-02 Log Out** | Logout entry point in nav · confirmation prompt (`Are you sure you want to log out?`) · `You have been logged out successfully.` · expired-session exception |
| [`uc-03-update-profile.html`](uc-03-update-profile.html) | **UC-03 Update Profile** | Account Settings · pre-filled Edit Profile form · inline validation + password strength · error states (`...is required`, `email already in use`, `Passwords do not match`) · `Profile updated successfully.` |
| [`uc-08-export-pdf.html`](uc-08-export-pdf.html) | **UC-08 Export PDF Report** | Results view with `Export PDF` · generation progress · browser download prompt · rendered PDF (project metadata, fault-tree summary, failure probability, confidence bounds, minimal cut sets, Monte Carlo histogram, NASA label) · exception messages |

## How to view

No build or dependencies required — open the files directly in any modern browser:

```bash
# from the repo root
open docs/srd/ui/giovanna/index.html      # macOS
xdg-open docs/srd/ui/giovanna/index.html  # Linux
```

Each page has a row of pills near the top to step through the use-case flow,
including alternative and exception courses of action.

## Design notes

- Framework-free HTML + CSS (shared `assets/style.css`) using the AeroRisk
  mission-control visual language. Intended to port 1:1 into the React frontend.
- Every screen maps directly to a functional/non-functional requirement from the
  use-case document (logout reachable from every page, inline validation feedback,
  password rules tooltip, NASA mission-context label on NASA-template reports, etc.).

Owner: Giovanna Schiraldi (P6 — Testing & Docs), CEN4010, FIU.
