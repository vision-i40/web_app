import { HttpClient, ID } from './types'

type CreateProductionOrderInput = {
  companyId: ID
  productionLineId: ID
  productId: ID
  quantity: number
  code: string
}

const createProductionOrder = ({
  httpClient
}: {
  httpClient: HttpClient
}) => async ({
  companyId,
  productionLineId,
  productId,
  quantity,
  code
}: CreateProductionOrderInput) => {
  return httpClient.post(`/v1/companies/${companyId}/production_orders/`, {
    code,
    quantity,
    production_line_id: productionLineId,
    product_id: productId
  })
}

export default createProductionOrder
