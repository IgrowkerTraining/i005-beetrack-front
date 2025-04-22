import { PROFILE_ENDPOINT } from '@/const/api';
import { Profile, Store } from '@/types/profileTypes';
import { apiRequest } from '@/utils/apiRequest';

export const profileService = {
    async getProfile(): Promise<Profile> {
        const res = await apiRequest<Profile>(PROFILE_ENDPOINT);
        
        return res;
    },

    async updateUser(updatedData: Partial<Profile>): Promise<Profile> {
        
        const { data: res } = await apiRequest<{ status: string, data: Profile }>(`${PROFILE_ENDPOINT}/user`, {
            method: 'PATCH',
            body: JSON.stringify(updatedData)
        })
        
        // console.log(res)
        return res;
    },

    async updateStore(updatedData: Partial<Store>): Promise<Profile> {
        const parsedStore = {
            storeName: updatedData.name,
            storeAddress: updatedData.address,
            storeTel: updatedData.tel
        }

        const { data: res } = await apiRequest<{ status: string, data: Profile }>(`${PROFILE_ENDPOINT}/store`, {
            method: 'PATCH',
            body: JSON.stringify(parsedStore)
        })

        return res;
    }
}