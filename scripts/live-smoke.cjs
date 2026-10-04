const assert = require('node:assert/strict');
const fs = require('node:fs');
const { NorthstarSupportSDK } = require('../ts/dist/NorthstarSupportSDK.js');

const base = process.env.NORTHSTAR_BASE || 'http://127.0.0.1:8768';
const outcomes = [];
const record = (name, details) => outcomes.push({ name, ...details });

async function main() {
  const anonymous = new NorthstarSupportSDK({ base });
  const health = await anonymous.Health().load();
  assert.equal(health.data().status, 'ok');
  record('health', { passed: true });

  const rejected = await anonymous.direct({ path: '/api/tickets', method: 'GET' });
  assert.equal(rejected.status, 401);
  record('unauthenticated_ticket_read', { passed: true, status: rejected.status });

  const session = await anonymous.Session().create({});
  assert.equal(session.data().ready, true);
  const afterSession = await anonymous.direct({ path: '/api/tickets', method: 'GET' });
  assert.equal(afterSession.status, 401);
  record('default_node_transport_has_no_cookie_jar', { passed: true, session_created: true, subsequent_status: 401 });

  let cookie = '';
  const calls = [];
  async function sessionFetch(url, init = {}) {
    const headers = new Headers(init.headers);
    if (cookie) headers.set('cookie', cookie);
    const response = await fetch(url, { ...init, headers });
    const cookies = response.headers.getSetCookie();
    const received = cookies.find(value => value.startsWith('northstar_session='));
    if (received) cookie = received.split(';', 1)[0];
    calls.push({ method: init.method || 'GET', path: new URL(url).pathname, status: response.status });
    return response;
  }

  const client = new NorthstarSupportSDK({ base, system: { fetch: sessionFetch } });
  const fresh = await client.Session().create({});
  assert.equal(fresh.data().ready, true);
  assert.ok(cookie.startsWith('northstar_session='));
  record('session_with_transport_adapter', { passed: true });

  const ticketList = await client.Ticket().load({});
  assert.ok(Array.isArray(ticketList.data()));
  assert.equal(ticketList.data().length, 6);
  record('semantic_ticket_collection_read', { passed: true, count: ticketList.data().length });

  const id = ticketList.data()[0].id;
  const detail = await client.Ticket().load({ id });
  assert.equal(detail.data().ticket.id, id);
  record('semantic_ticket_detail_read', { passed: true });

  const missing = await client.direct({ path: '/api/tickets/does-not-exist', method: 'GET' });
  assert.equal(missing.status, 404);
  record('missing_ticket', { passed: true, status: 404 });
  const policies = await client.Policy().load({});
  assert.ok(policies.data());
  record('semantic_policy_read', { passed: true });

  const evidence = { tested_at: new Date().toISOString(), node: process.version, scope: 'Existing API, fresh synthetic session, no model generation or approvals', outcomes, calls };
  fs.writeFileSync(new URL('../evidence/live-smoke.json', `file://${__filename}`), JSON.stringify(evidence, null, 2) + '\n');
  console.log(JSON.stringify(evidence, null, 2));
}

main().catch(err => {
  console.error(err.message);
  process.exitCode = 1;
});
