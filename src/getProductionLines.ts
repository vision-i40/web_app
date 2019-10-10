import { HttpClient, ProductionLine, ID } from './types'

const getProductionLines = ({
  httpClient
}: {
  httpClient: HttpClient
}) => async (companyId: ID) => {
  return httpClient
    .get<{ results: ProductionLine[] }>(
      `/v1/companies/${companyId}/production_lines/`
    )
    .then(response => response.results)
}

export default getProductionLines
