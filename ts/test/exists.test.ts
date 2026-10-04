
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { NorthstarSupportSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = NorthstarSupportSDK.test()
    equal(testsdk instanceof NorthstarSupportSDK, true,
      'NorthstarSupportSDK.test() must return a client synchronously')
  })

})
