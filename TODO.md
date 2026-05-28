# TODO — Themes + Extension Persistence Fix

- [ ] Inspect current theme/extension activation + persistence logic in `vscode.html`.
- [ ] Ensure CodeMirror theme switching uses the correct theme names/classes.
- [ ] Fix persistence so extension enabled states (including the active theme) load correctly after refresh.
- [ ] Add a post-restore re-apply step for the current theme and for enabled extensions.
- [ ] Run a quick sanity check by inspecting the generated state flow (no runtime tests available here).

