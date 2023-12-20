export interface GetMemberProfileResponse {
  data: MemberProfile
}

export interface VerifyMemberRequest {
  customerName: string
  phoneNumber: string
  lineId: string
}

export interface MemberProfile {
  customerName: string
  userId: string
  email: string
  expiredDate: string
  memberPoint: number
  netflixDayLeft: number
  netflixPackageName: string
  netflixEmail: string
  netflixPassword: string
  password: string
  phoneNumber: string
  verifiedStatus: string
  youtubeDayLeft: number
  youtubePackageName: string
  lineUserId: string
  isPhoneVerified: boolean
  isLineVerified: boolean
  isCustomerVerified: boolean
}

export interface Reward {
  id: string
  rewardName: string
  rewardValue: string
  redeemPoint: number
  isActive: boolean
}

export interface NetflixPackage {
  packageId: string
  packageName: string
  packageDay: number
  packagePrice: number
  packageType: string
}

export interface GetNetflixPackageResponse {
  data: NetflixPackage[]
}

export interface YoutubePackage {
  packageId: string
  packageName: string
  packageDay: number
  packagePrice: number
  packageType: string
}

export interface GetYoutubePackageResponse {
  data: YoutubePackage[]
}
