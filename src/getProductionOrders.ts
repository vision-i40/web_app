import { HttpClient, ID, ProductionOrder } from './types'

export default ({ httpClient }: { httpClient: HttpClient }) => async (
  companyId: ID,
  productionLineId: ID
) => {
  return httpClient
    .get<{ results: ProductionOrder[] }>(
      `/v1/companies/${companyId}/production_orders/?production_line_id=${productionLineId}`
    )
    .then(response => response.results)
}
