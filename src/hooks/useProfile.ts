import { PROFILE_ENDPOINT } from '@/const/api';
import { profileService } from '@/services/profileService';
import useProfileStore from '@/store/useProfileStore'
import useSidenavbarStore from '@/store/useSidenavbarStore';
import { Profile } from '@/types/profileTypes';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useFetchProfile = () => {
    const { fetchProfile, profile } = useProfileStore();
    const { setTitleToTopBar } = useSidenavbarStore();

    const query = useQuery<Profile, Error>({
        queryKey: [PROFILE_ENDPOINT],
        queryFn: () => profileService.getProfile(),
        enabled: !profile,
        staleTime: 5 * 60 * 1000,
    });

    // Necesario para no entrar en bucle
    useEffect(() => {
        if (query.data && !profile) {
            fetchProfile(query.data)
            setTitleToTopBar(query.data.store.name)
        }
    }, [query.data, fetchProfile, profile])

    return query;
}