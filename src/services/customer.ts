import { AdminBffAPI } from 'api/admin-bff'
import { getCustomerProfileResponse } from './customer-type'

export const getCustomerProfile = async(): Promise<getCustomerProfileResponse> => {
    const response = await AdminBffAPI.get('/v1/customer-web/profile')
        .then((response) => response.data)
    return response
}