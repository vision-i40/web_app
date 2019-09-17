import { HttpClient, ProductionLine } from './types'

type GetProductionLinesDependency = {
  httpClient: HttpClient
}

type GetProductionLinesResponse = {
  results: ProductionLine[]
}

const getProductionLines = ({
  httpClient
}: GetProductionLinesDependency) => async (companyId: string | number) => {
  return httpClient
    .get<GetProductionLinesResponse>(
      `/v1/companies/${companyId}/production_lines/`
    )
    .then(response => response.results)
}

export default getProductionLines
