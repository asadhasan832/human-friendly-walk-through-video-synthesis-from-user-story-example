# Human Friendly Walk-through Video Synthesis from User Story Testing Example

This work stems from the realization that a product  walkthrough could be defined as user story testing intended for a human audience. Expanding on this idea we create an example polyglot user story test which can offer both 
rapid testing and a more human friendly walkthrough video synthesis.

[Read Medium Story](https://medium.com/@asad_50670/human-friendly-walk-through-video-synthesis-from-user-story-testing-521c4f997dd6)

```bash
# Install dependencies
npm i
# Execute with walkthrough mode capability flag on
WALKTHROUGH_MODE=on npx playwright test
# Execute with walkthrough mode capability flag off
WALKTHROUGH_MODE=off npx playwright test
# Find video output
ls test-results/idempotence_ca-IC-2-Send-Connection-Request-chromium/video.webm
```
