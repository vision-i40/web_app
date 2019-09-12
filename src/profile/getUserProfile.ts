import { HttpClient } from '../types'

type GetUserCompanyDependencies = {
  httpClient: HttpClient
}

type GetUserProfileResponse = {
  default_company: {
    id: number
  }
}

const getUserProfile = ({
  httpClient
}: GetUserCompanyDependencies) => async () => {
  return httpClient.get<GetUserProfileResponse>('/v1/users/current/')
}

export default getUserProfile
