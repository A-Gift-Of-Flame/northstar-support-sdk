# Northstar Support SDK

TypeScript SDK for agiftofflame's Northstar Support portfolio API, generated with the [Voxgig SDK generator](https://voxgig.com/sdk). MIT licensed. This is a synthetic support demo: no real customer emails, refunds or returns are executed.

The original FastAPI OpenAPI document is included unchanged in `openapi.json`. The SDK build supplies a loopback server URL because that document omits `servers`. The API is a private development demo; this repository publishes the SDK and API description, and does not provide a hosted API. It was absent from the Voxgig catalogue when checked on 4 October 2026.

## Install from source

Requires Node.js 24 or later. This package has not been published to npm.

```sh
git clone https://github.com/A-Gift-Of-Flame/northstar-support-sdk.git
cd northstar-support-sdk/ts
npm ci
npm run build
npm test
```

## Quickstart

The API must be running locally for live calls. After building the TypeScript target:

```ts
import { NorthstarSupportSDK } from '@a-gift-of-flame/northstar-support-sdk'

const client = new NorthstarSupportSDK({ base: 'http://127.0.0.1:8768' })
const health = await client.Health().load()
console.log(health.data())
```

For session-protected endpoints, Node fetch needs a cookie transport adapter. The executable example in [scripts/live-smoke.cjs](scripts/live-smoke.cjs) captures a fresh session cookie in memory and supplies it on subsequent calls using the SDK's `system.fetch` option. It tests session creation, semantic ticket collection/detail reads, policies, an unauthenticated 401 and a missing-ticket 404. Run it against the existing demo:

```sh
node scripts/live-smoke.cjs
```

Set `NORTHSTAR_BASE` to use a different development URL. The script saves only statuses and counts to `evidence/live-smoke.json`; it does not save the cookie or ticket contents. It creates fresh synthetic sessions. It does not run model inference, approve replies or reset existing sessions.

## Regenerate

```sh
cd .sdk
npm ci
npm run generate
npx voxgig-sdkgen doctor
cd ../ts
npm ci
npm test
```

The `.sdk/model/project.aontu` overlay declares the repository and author, and disables generator ownership of root project files so this README and copyright notice survive regeneration. The model, templates and components drive `ts/`; generated target files have not been hand-edited. Only TypeScript was attempted.

Read [ASSESSMENT.md](ASSESSMENT.md) for the short report and [evidence/verification.json](evidence/verification.json) for actual automated results. Generated [TypeScript documentation](ts/README.md) describes the generic SDK surface. Its sparse types reflect the source API's missing response schemas, and its generic upstream non-affiliation text does not describe this author-owned demo accurately.

## Limits

The raw API spec omits cookie security definitions and response models. Passing the offline suite proves the generated fixture behavior and documented examples, not full API correctness. Live checks cover the reads and session flow described above; draft generation, approvals, usage export and production authentication are untested. Session authentication is a demo isolation mechanism, not production staff authentication. AI performed implementation and automated verification; no independent human usability evaluation is claimed.
