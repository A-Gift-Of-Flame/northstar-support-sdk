// Typed models for the NorthstarSupport SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Export {
}

export interface ExportLoadMatch {
}

export interface Health {
}

export interface HealthLoadMatch {
}

export interface IndexGet {
}

export interface IndexGetLoadMatch {
}

export interface Policy {
}

export interface PolicyLoadMatch {
}

export interface Reset {
}

export interface ResetCreateData {
}

export interface Session {
}

export interface SessionCreateData {
}

export interface Ticket {
  id?: string
}

export interface TicketLoadMatch {
  id: string
}

export interface TicketCreateData {
  id: string

  // Selects a custom action instead of the plain create:
  //   'approve' | 'draft'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Usage {
}

export interface UsageLoadMatch {
}

