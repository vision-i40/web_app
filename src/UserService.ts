export type Profile = {
  id: number, 
  company: {
    id: number, 
    name: string
  }
}

type UserApiClient = {
  fetchProfile: () => Promise<Profile>
}

const UserService = (userApi: UserApiClient) => ({
  async fetchProfile() {
    return userApi.fetchProfile()
  }
})

export default UserService