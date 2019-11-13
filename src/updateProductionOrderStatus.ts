import { HttpClient, ID } from './types'

type UpdateProductionOrderStatusParams = {
  companyId: ID
  productionOrderId: ID
  state: string
}

const createProductionOrder = ({
  httpClient
}: {
  httpClient: HttpClient
}) => async ({
  companyId,
  productionOrderId,
  state
}: UpdateProductionOrderStatusParams) => {
  return httpClient.patch(
    `/v1/companies/${companyId}/production_orders/${productionOrderId}/`,
    {
      state
    }
  )
}

export default createProductionOrder
