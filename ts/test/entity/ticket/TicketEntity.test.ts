

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { NorthstarSupportSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('TicketEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NORTHSTAR_SUPPORT_TEST_LIVE=TRUE.
  afterEach(liveDelay('NORTHSTAR_SUPPORT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NorthstarSupportSDK.test()
    const ent = testsdk.Ticket()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NORTHSTAR_SUPPORT_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ticket.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"ticket","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/tickets/{tid}/approve","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"tid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/tickets/{tid}/approve","q":{"$action":"approve","exist":["id"]},"r":{"param":{"tid":"id"}},"s":[{"lit":"api"},{"lit":"tickets"},{"var":"id"},{"lit":"approve"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /api/tickets/{tid}/draft","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"tid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/tickets/{tid}/draft","q":{"$action":"draft","exist":["id"]},"r":{"param":{"tid":"id"}},"s":[{"lit":"api"},{"lit":"tickets"},{"var":"id"},{"lit":"draft"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/tickets/{tid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"tid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/tickets/{tid}","q":{"exist":["id"]},"r":{"param":{"tid":"id"}},"s":[{"lit":"api"},{"lit":"tickets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/tickets","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/tickets","q":{},"r":{},"s":[{"lit":"api"},{"lit":"tickets"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"ticket","name__orig":"ticket","Name":"Ticket","name_":"ticket","name-":"ticket","NAME":"TICKET","index$":6}, {"active":true,"entity":"ticket","key$":"BasicTicketFlow","kind":"basic","name":"BasicTicketFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"ticket_ref01"},"m":{"tid":"tid01"},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{"ref":"ticket_ref01","srcdatavar":"ticket_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-ticket_ref01"}}]}]}, 'Ticket', {"POST /api/tickets/{tid}/approve":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"run_id":{"type":"string","maxLength":64,"minLength":1,"title":"Run Id"},"reply":{"type":"string","maxLength":4000,"minLength":10,"title":"Reply"}},"type":"object","required":["run_id","reply"],"title":"ReviewRequest","x-ref":"#/components/schemas/ReviewRequest"}}}},"parameters":[{"name":"tid","in":"path","required":true,"schema":{"type":"string","title":"Tid"},"index$":0}]},"POST /api/tickets/{tid}/draft":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"mode":{"type":"string","enum":["local","reference"],"title":"Mode","default":"local"}},"type":"object","title":"DraftRequest","x-ref":"#/components/schemas/DraftRequest"}}}},"parameters":[{"name":"tid","in":"path","required":true,"schema":{"type":"string","title":"Tid"},"index$":0}]},"GET /api/tickets/{tid}":{"protocol":"http","parameters":[{"name":"tid","in":"path","required":true,"schema":{"type":"string","title":"Tid"},"index$":0}]},"GET /api/tickets":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const ticket_ref01_ent = client.Ticket()
    let ticket_ref01_data = setup.data.new.ticket['ticket_ref01']
    ticket_ref01_data['tid'] = setup.idmap['tid01']

    ticket_ref01_data = (await ticket_ref01_ent.create(ticket_ref01_data)).data()
    assert(null != ticket_ref01_data.id)


    // LOAD
    const ticket_ref01_match_dt0: any = {}
    ticket_ref01_match_dt0.id = ticket_ref01_data.id
    const ticket_ref01_data_dt0 = (await ticket_ref01_ent.load(ticket_ref01_match_dt0)).data()
    assert(ticket_ref01_data_dt0.id === ticket_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/ticket/TicketTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = NorthstarSupportSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['ticket01','ticket02','ticket03','tid01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NORTHSTAR_SUPPORT_TEST_TICKET_ENTID': idmap,
    'NORTHSTAR_SUPPORT_TEST_LIVE': 'FALSE',
    'NORTHSTAR_SUPPORT_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['NORTHSTAR_SUPPORT_TEST_TICKET_ENTID']

  const live = 'TRUE' === env.NORTHSTAR_SUPPORT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NORTHSTAR_SUPPORT_TEST_TICKET_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new NorthstarSupportSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.NORTHSTAR_SUPPORT_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
