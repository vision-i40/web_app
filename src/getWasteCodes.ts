import { HttpClient, ID, WasteCode } from './types'

type GetWasteCodesResponse = {
  results: {
    id: string
    name: string
  }[]
}

const getWasteCodes = ({ httpClient }: { httpClient: HttpClient }) => async (
  companyId: ID,
  codeGroupId: ID
): Promise<WasteCode[]> =>
  httpClient
    .get<GetWasteCodesResponse>(
      `/v1/companies/${companyId}/code_groups/${codeGroupId}/waste_codes/`
    )
    .then(response => response.results)

export default getWasteCodes
