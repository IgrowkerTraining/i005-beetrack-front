import { PROFILE_ENDPOINT } from '@/const/api';
import { Profile } from '@/types/profileTypes';
import { apiRequest } from '@/utils/apiRequest';

export const profileService = {
    async getProfile(): Promise<Profile> {
        const res = await apiRequest<Profile>(PROFILE_ENDPOINT);
        
        return res;
    }
}