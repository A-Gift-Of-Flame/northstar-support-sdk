
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'NorthstarSupport',
        slug: "northstar-support",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },

  }


  options = {
    base: "http://127.0.0.1:8768",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        export: {
        },
  
        health: {
        },
  
        index_get: {
        },
  
        policy: {
        },
  
        reset: {
        },
  
        session: {
        },
  
        ticket: {
        },
  
        usage: {
        },
  
    }
  }


  entity = {
    "export": {
      "fields": [],
      "name": "export",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/usage/export",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "usage"
                },
                {
                  "lit": "export"
                }
              ],
              "parts": [
                "api",
                "usage",
                "export"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "health": {
      "fields": [],
      "name": "health",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/health",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "health"
                }
              ],
              "parts": [
                "api",
                "health"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "index_get": {
      "fields": [],
      "name": "index_get",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/",
              "segments": [],
              "parts": [],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "policy": {
      "fields": [],
      "name": "policy",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/policies",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "policies"
                }
              ],
              "parts": [
                "api",
                "policies"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "reset": {
      "fields": [],
      "name": "reset",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/reset",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "reset"
                }
              ],
              "parts": [
                "api",
                "reset"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "session": {
      "fields": [],
      "name": "session",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/session",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "session"
                }
              ],
              "parts": [
                "api",
                "session"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "ticket": {
      "fields": [
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "ticket",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/tickets/{tid}/approve",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "tickets"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "approve"
                }
              ],
              "parts": [
                "api",
                "tickets",
                "{id}",
                "approve"
              ],
              "rename": {
                "param": {
                  "tid": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "tid",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "$action": "approve",
                "exist": [
                  "id"
                ]
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/tickets/{tid}/draft",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "tickets"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "draft"
                }
              ],
              "parts": [
                "api",
                "tickets",
                "{id}",
                "draft"
              ],
              "rename": {
                "param": {
                  "tid": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "tid",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "$action": "draft",
                "exist": [
                  "id"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/tickets/{tid}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "tickets"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "tickets",
                "{id}"
              ],
              "rename": {
                "param": {
                  "tid": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "tid",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/tickets",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "tickets"
                }
              ],
              "parts": [
                "api",
                "tickets"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "usage": {
      "fields": [],
      "name": "usage",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/usage",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "usage"
                }
              ],
              "parts": [
                "api",
                "usage"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

