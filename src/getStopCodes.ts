import { HttpClient, ID, StopCode } from './types'

type GetStopCodesResponse = {
  results: {
    id: string
    name: string
  }[]
}

const getStopCodes = ({ httpClient }: { httpClient: HttpClient }) => async (
  companyId: ID,
  codeGroupId: ID
): Promise<StopCode[]> =>
  httpClient
    .get<GetStopCodesResponse>(
      `/v1/companies/${companyId}/code_groups/${codeGroupId}/stop_codes/`
    )
    .then(response => response.results)

export default getStopCodes
