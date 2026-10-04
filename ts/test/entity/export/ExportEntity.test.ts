

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


describe('ExportEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NORTHSTAR_SUPPORT_TEST_LIVE=TRUE.
  afterEach(liveDelay('NORTHSTAR_SUPPORT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NorthstarSupportSDK.test()
    const ent = testsdk.Export()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NORTHSTAR_SUPPORT_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'export.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"export","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/usage/export","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/usage/export","q":{},"r":{},"s":[{"lit":"api"},{"lit":"usage"},{"lit":"export"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"export","name__orig":"export","Name":"Export","name_":"export","name-":"export","NAME":"EXPORT","index$":0}, {"active":true,"entity":"export","key$":"BasicExportFlow","kind":"basic","name":"BasicExportFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"export_ref01","srcdatavar":"export_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-export_ref01"}}]}]}, 'Export', {"GET /api/usage/export":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let export_ref01_data = Object.values(setup.data.existing.export)[0] as any

    // LOAD
    const export_ref01_ent = client.Export()
    const export_ref01_match_dt0: any = {}
    const export_ref01_data_dt0 = (await export_ref01_ent.load(export_ref01_match_dt0)).data()
    assert(null != export_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/export/ExportTestData.json')

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
    ['export01','export02','export03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NORTHSTAR_SUPPORT_TEST_EXPORT_ENTID': idmap,
    'NORTHSTAR_SUPPORT_TEST_LIVE': 'FALSE',
    'NORTHSTAR_SUPPORT_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['NORTHSTAR_SUPPORT_TEST_EXPORT_ENTID']

  const live = 'TRUE' === env.NORTHSTAR_SUPPORT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NORTHSTAR_SUPPORT_TEST_EXPORT_ENTID']
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
  
