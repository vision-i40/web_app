import { HttpClient, ID, CodeGroup, GroupTypes } from './types'

type GetCodeGroupsResponse = {
  results: {
    id: string
    name: string
    group_type: GroupTypes
  }[]
}

const getCodeGroups = ({ httpClient }: { httpClient: HttpClient }) => async (
  companyId: ID
): Promise<CodeGroup[]> =>
  httpClient
    .get<GetCodeGroupsResponse>(`/v1/companies/${companyId}/code_groups/`)
    .then(response =>
      response.results.map(result => ({
        id: result.id,
        name: result.name,
        groupType: result.group_type
      }))
    )

export default getCodeGroups
