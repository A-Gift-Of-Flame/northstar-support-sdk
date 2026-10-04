import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "export",
    "accessor": "Export",
    "op": "load",
    "method": "GET",
    "path": "/api/usage/export",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "health",
    "accessor": "Health",
    "op": "load",
    "method": "GET",
    "path": "/api/health",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "index_get",
    "accessor": "IndexGet",
    "op": "load",
    "method": "GET",
    "path": "/",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "policy",
    "accessor": "Policy",
    "op": "load",
    "method": "GET",
    "path": "/api/policies",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "reset",
    "accessor": "Reset",
    "op": "create",
    "method": "POST",
    "path": "/api/reset",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "session",
    "accessor": "Session",
    "op": "create",
    "method": "POST",
    "path": "/api/session",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "ticket",
    "accessor": "Ticket",
    "op": "create",
    "method": "POST",
    "path": "/api/tickets/{tid}/approve",
    "action": "approve",
    "args": [
      {
        "name": "id",
        "wire": "tid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "ticket",
    "accessor": "Ticket",
    "op": "create",
    "method": "POST",
    "path": "/api/tickets/{tid}/draft",
    "action": "draft",
    "args": [
      {
        "name": "id",
        "wire": "tid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "ticket",
    "accessor": "Ticket",
    "op": "load",
    "method": "GET",
    "path": "/api/tickets/{tid}",
    "args": [
      {
        "name": "id",
        "wire": "tid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "ticket",
    "accessor": "Ticket",
    "op": "load",
    "method": "GET",
    "path": "/api/tickets",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "usage",
    "accessor": "Usage",
    "op": "load",
    "method": "GET",
    "path": "/api/usage",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
