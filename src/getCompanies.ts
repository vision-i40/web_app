import { HttpClient, Company } from './types'

type GetCompaniesResponse = {
  results: Company[]
}

const getCompanies = ({ httpClient }: { httpClient: HttpClient }) => async () =>
  httpClient
    .get<GetCompaniesResponse>('/v1/companies/')
    .then(response => response.results)

export default getCompanies
