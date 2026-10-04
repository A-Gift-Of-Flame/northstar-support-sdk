

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


describe('SessionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NORTHSTAR_SUPPORT_TEST_LIVE=TRUE.
  afterEach(liveDelay('NORTHSTAR_SUPPORT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NorthstarSupportSDK.test()
    const ent = testsdk.Session()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NORTHSTAR_SUPPORT_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'session.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"session","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/session","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/session","q":{},"r":{},"s":[{"lit":"api"},{"lit":"session"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"session","name__orig":"session","Name":"Session","name_":"session","name-":"session","NAME":"SESSION","index$":5}, {"active":true,"entity":"session","key$":"BasicSessionFlow","kind":"basic","name":"BasicSessionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"session_ref01"},"m":{},"o":"create","s":[],"v":[]}]}, 'Session', {"POST /api/session":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const session_ref01_ent = client.Session()
    let session_ref01_data = setup.data.new.session['session_ref01']

    session_ref01_data = (await session_ref01_ent.create(session_ref01_data)).data()
    assert(null != session_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/session/SessionTestData.json')

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
    ['session01','session02','session03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NORTHSTAR_SUPPORT_TEST_SESSION_ENTID': idmap,
    'NORTHSTAR_SUPPORT_TEST_LIVE': 'FALSE',
    'NORTHSTAR_SUPPORT_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['NORTHSTAR_SUPPORT_TEST_SESSION_ENTID']

  const live = 'TRUE' === env.NORTHSTAR_SUPPORT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NORTHSTAR_SUPPORT_TEST_SESSION_ENTID']
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
  
