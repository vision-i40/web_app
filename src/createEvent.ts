import { HttpClient, ID } from './types'

export type EventInput = {
  quantity: number
  eventType: string
  eventDatetime: string
  wasteCode?: string
  reworkCode?: string
}

type CreateEventParams = {
  data: EventInput
  companyId: ID
  productionOrderId: ID
  productionLineId: ID
}

const createProductionEvent = ({
  httpClient
}: {
  httpClient: HttpClient
}) => async ({
  data,
  companyId,
  productionLineId,
  productionOrderId
}: CreateEventParams) => {
  return httpClient.post(
    `/v1/companies/${companyId}/production_orders/${productionOrderId}/production_events/`,
    {
      quantity: data.quantity,
      event_type: data.eventType,
      event_datetime: data.eventDatetime,
      waste_code: data.wasteCode,
      rework_code: data.reworkCode,
      production_line_id: productionLineId
    }
  )
}

export default createProductionEvent
