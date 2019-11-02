import { HttpClient, ID } from './types'

export type ManualStopInput = {
  stop_code_id: ID
  start_datetime: string
  end_datetime: string
}

type CreateManualStopParams = {
  data: ManualStopInput
  companyId: ID
  productionLineId: ID
}

export default ({ httpClient }: { httpClient: HttpClient }) => async ({
  data,
  companyId,
  productionLineId
}: CreateManualStopParams) => {
  return httpClient.post(
    `/v1/companies/${companyId}/production_lines/${productionLineId}/manual_stops/`,
    data
  )
}
