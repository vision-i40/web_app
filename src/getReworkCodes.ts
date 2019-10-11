import { HttpClient, ID, ReworkCode } from './types'

type GetReworkCodesResponse = {
  results: {
    id: string
    name: string
  }[]
}

const getReworkCodes = ({ httpClient }: { httpClient: HttpClient }) => async (
  companyId: ID,
  codeGroupId: ID
): Promise<ReworkCode[]> =>
  httpClient
    .get<GetReworkCodesResponse>(
      `/v1/companies/${companyId}/code_groups/${codeGroupId}/rework_codes/`
    )
    .then(response => response.results)

export default getReworkCodes
