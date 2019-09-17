import { HttpClient, ProductionLine } from './types'

type GetProductionLinesDependency = {
  httpClient: HttpClient
}

const GetProductionLine = ({
  httpClient
}: GetProductionLinesDependency) => async (
  companyId: string | number,
  productionLineId: string | number
) => {
  return httpClient.get<ProductionLine>(
    `/v1/companies/${companyId}/production_lines/${productionLineId}/`
  )
}

export default GetProductionLine
