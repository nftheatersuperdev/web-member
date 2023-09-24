import { AdminBffAPI } from 'api/admin-bff'
import ls from 'localstorage-slim'

export const STORAGE_KEYS = {
  TOKEN: 'user_token',
  USER_ID: 'user_id',
}

export const login = async (username: string, password: string): Promise<void> => {
  const user = await AdminBffAPI.post('/v1/member/login', {
    username,
    password,
  })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        throw error.response
      }
      throw error
    })
  ls.set<string>(STORAGE_KEYS.USER_ID, username)
  ls.set<string>(STORAGE_KEYS.TOKEN, user.data.token)
}

export const logout = async (): Promise<void> => {
  ls.remove(STORAGE_KEYS.TOKEN)
}

export const getToken = (): string => {
  return ls.get<Text>(STORAGE_KEYS.TOKEN) || ''
}
