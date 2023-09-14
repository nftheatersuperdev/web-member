export interface getCustomerProfileResponse {
    data: CustomerProfile
}

export interface CustomerProfile {
    customerName: string
    userId: string
    email: string
    expiredDate: string
    invitingPoint: number
    netflixDayLeft: number
    netflixPackageName: string
    netflixEmail: string
    netflixPassword: string
    password: string
    phoneNumber: string
    verifiedStatus: string
    youtubeDayLeft: number
    youtubePackageName: string
}