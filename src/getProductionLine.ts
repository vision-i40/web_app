import { ProductionLine, HttpClient } from './types'

type GetProductionLineDependency = {
  httpClient: HttpClient
}

const getProductionLine = ({
  httpClient
}: GetProductionLineDependency) => async (
  companyId: string | number,
  productionLineId: string | number
) => {
  return httpClient.get<ProductionLine>(
    `/v1/companies/${companyId}/production_lines/${productionLineId}/`
  )
}

export default getProductionLine
