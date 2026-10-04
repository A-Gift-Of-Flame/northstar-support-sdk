# Voxgig first mini-task: Northstar Support SDK

Prepared for agiftofflame, 4 October 2026. AI-assisted implementation and automated observations; no independent human usability evaluation is claimed.

## Scope and verification

Used Northstar Support, my existing synthetic support portfolio API, as the personal-project option Richard suggested. A GitHub catalogue search for `northstar org:voxgig-sdk` returned zero repositories with `incomplete_results: false`. Generated a TypeScript SDK from its unmodified FastAPI OpenAPI 3.1 document using `@voxgig/create-sdkgen` and `@voxgig/sdkgen` 4.34.0. The source, reproducible generator model and MIT licence are in this repository.

The initial generated suite returned 232 passes, two failures and one skip out of 235 tests. Both failures were in `clean.test.ts`: the spec has no `servers`, so the required `base` variable was missing. Supplying a loopback server URL through `ApiDef.makeBuild` fixed those failures. Final result: **234 passes, zero failures, one skip**. `voxgig-sdkgen doctor` reported that `.sdk` matches the scaffold, with zero additive changes. Generated TypeScript source and tests were not hand-edited.

A separate live smoke script passed eight checks against the existing demo: health, an unauthenticated ticket request returning 401, session creation, the default Node transport's missing cookie persistence, a session with a cookie adapter, six-ticket collection read, ticket detail, missing-ticket 404 and policy read. The eight named checks combine session creation and persistence observations. Actual calls and counts are saved in `evidence/live-smoke.json`; no session cookie or ticket content is saved. No model calls, approvals or real customer actions were performed. Offline tests alone are not treated as proof of live correctness.

## Developer-experience findings and recommendations

1. **Missing-server path:** the generator gives a useful warning and an explicit runtime error. However, the default generated clean tests fail for this otherwise supported spec shape. Make those tests supply a base or activate test mode consistently; add this FastAPI case to generator regression coverage.
2. **Cookie sessions:** session creation succeeds, but Node fetch does not persist the returned cookie, so the next protected request returns 401. A short adapter through the supported `system.fetch` option fixes the live flow. Document this distinction and provide a cookie-session example. The original API spec also omits cookie security declarations, so this is partly an input-document limitation.
3. **Metadata:** the default repository and package scope point at `voxgig-sdk`, and the generated root copyright names Voxgig. The author and repository can be declared in `project.aontu`; the root copyright does not follow that author setting. An author-owned project needs guidance and an author-aware copyright option. This project disables root generation and preserves a MIT notice naming agiftofflame and Voxgig's generator-derived code. Generic non-affiliation wording also needs an author-owned API option.
4. **Documentation:** the website runbook still refers to `.aon`, while the current scaffold uses `.aontu`. Generation also emitted `require-missing` warnings for `ReadmeFeatures_ts` and `AgentGuide_ts`, although it completed and tests passed. Update the runbook and explain whether these warnings are optional fallbacks or failures.

## AI use, time and limits

the applicant directed the assistant to complete the assessment and read the full email thread. Codex selected the existing demo API, ran the Voxgig generator, supplied project metadata and the build server option, wrote the cookie adapter, ran checks, and drafted this report from saved results. Findings above are automated observations for the applicant to review; they are not invented personal impressions.

Active human time was not measured, and no completed 30-minute personal session is claimed. The user can review the artifact within the requested human-work cap. The automated session timestamps are recorded separately in the evidence. No later exercise, invoice or payment completion is claimed.

Only TypeScript was attempted. Sparse response types reflect the API's empty response schemas. Draft generation, approvals, usage export, other languages and production authentication remain untested. The API is a private synthetic development demo, not a hosted SaaS service. The SDK is published as GitHub source, not an npm release.
