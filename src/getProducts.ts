import { HttpClient, ID, Product } from './types'

export default ({ httpClient }: { httpClient: HttpClient }) => async (
  companyId: ID
) => {
  return httpClient
    .get<{ results: Product[] }>(`/v1/companies/${companyId}/products/`)
    .then(response => response.results)
}
