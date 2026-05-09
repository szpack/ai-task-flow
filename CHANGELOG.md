# Changelog

All notable changes to AI Task Flow are documented in this file.

This project uses semantic versioning. Version numbers are managed with `npm run version:*` scripts.

## [Unreleased]

## [0.2.0] - 2026-05-09

### Added
- Added an optional shared LAN server so multiple computers can read and save the same task library.
- Added project context intake and JSON import for project background.
- Added image reference support in new task intake prompts.
- Added visible app version metadata.
- Added automated version bumping and changelog management.
- Added a previous-library backup restore action for local task data.

### Changed
- Split the previous single-file app into `index.html`, `styles.css`, and `app.js` for easier maintenance.
- New task intake now opens as a workspace page instead of a modal.
- New task intake now uses a step-by-step wizard for describing the request, handing off to a large model, and importing JSON.
- AI-suggested task category labels now follow the current UI language for known category prefixes.
- Imported tasks are no longer selected automatically after import.
- New task form fields are cleared after successful import.
- Default task library now starts as an empty generic workspace.

## [0.1.0] - 2026-05-09

### Added
- Initial local-first static task workflow app.
- Task filtering, status tracking, current task pinning, prompt generation, execution backfill, localStorage persistence, and JSON export.
