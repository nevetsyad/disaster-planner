# DisasterDesk

A humorously overconfident natural disaster planning assistant. Pick a scenario, get a plan, and check off the basics.

**Pro Mode** toggles the fictional Federal Bureau of Contingency Paperwork edition, with agency-flavored satire for storms, earthquakes, heat waves, and zombies. Switching modes keeps the selected scenario and checklist progress. The checklist stays personal-prep oriented in both modes; progress is in-memory and resets on reload.

Static site: plain HTML, CSS, and JavaScript. No runtime dependencies or build step. No actual government seals, affiliation, or authority.

## Checks

Run `npm ci` then `npm test` and `npm run check`. The jsdom tests execute the production script against the actual HTML, covering both modes, every scenario, all regeneration alternatives, exact normal-copy restoration, checklist state, focus retention, and accessible control semantics. They do not replace visual browser or assistive-technology testing.

Scenario buttons and the Pro Mode toggle use native keyboard activation and `aria-pressed`. Checklist inputs remain focusable with visible focus styling. Motion is disabled when reduced motion is requested.

> Independent satire, not official emergency advice. Plans and scores are fictional. In a real emergency, follow local officials and emergency services.
