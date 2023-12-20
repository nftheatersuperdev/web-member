import { AdminBffAPI } from 'api/admin-bff'
import {
  Reward,
  GetMemberProfileResponse,
  GetNetflixPackageResponse,
  GetYoutubePackageResponse,
} from './member-type'

export const getMemberProfile = async (): Promise<GetMemberProfileResponse> => {
  const response = await AdminBffAPI.get('/v1/member/profile').then((response) => response.data)
  return response
}

export const verifyMember = async (
  phoneNumber: string,
  lineId: string,
  lineUserId: string
): Promise<Response> => {
  const response = await AdminBffAPI.post('/v1/member/verify', {
    phoneNumber,
    lineId,
    lineUserId,
  })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        throw error.response
      }
      throw error
    })
  return response.data
}

export const getRewardList = async (): Promise<Reward[]> => {
  const response = await AdminBffAPI.get('/v1/member/rewards')
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        throw error.response
      }
      throw error
    })
  return response.data
}

export const redeemReward = async (rewardId: string): Promise<Response> => {
  const response = await AdminBffAPI.post(`/v1/member/reward/${rewardId}/redeem`)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        throw error.response
      }
      throw error
    })
  return response.data
}

export const getNetflixPackage = async (): Promise<GetNetflixPackageResponse> => {
  const response = await AdminBffAPI.get(`/v1/member/netflix/packages`).then(
    (response) => response.data
  )
  return response.data
}

export const getYoutubePackage = async (): Promise<GetYoutubePackageResponse> => {
  const response = await AdminBffAPI.get('/v1/member/youtube/packages').then(
    (response) => response.data
  )
  return response.data
}

export const requestOtp = async (mobileNo: string): Promise<string> => {
  const response = await AdminBffAPI.post('/v1/member/request-otp', {
    mobileNo,
  })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        throw error.response
      }
      throw error
    })
  return response.data
}

export const verifyOtp = async (pinCode: string, refCode: string): Promise<string> => {
  const response = await AdminBffAPI.post('/v1/member/verify-otp', { pinCode, refCode })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        throw error.response
      }
      throw error
    })
  return response.data
}
