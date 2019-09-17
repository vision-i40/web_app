import { ProductionLine } from './types'
import container from './container'

const getProductionLine = async (
  companyId: string | number,
  productionLineId: string | number
) => {
  return container.secureHttpClient.get<ProductionLine>(
    `/v1/companies/${companyId}/production_lines/${productionLineId}/`
  )
}

export default getProductionLine
