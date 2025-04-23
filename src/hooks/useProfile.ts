import { PROFILE_ENDPOINT } from '@/const/api';
import { profileService } from '@/services/profileService';
import useProfileStore from '@/store/useProfileStore';
import { Profile, Store } from '@/types/profileTypes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useFetchProfile = () => {
    const { fetchProfile } = useProfileStore();

    const query = useQuery<Profile, Error>({
        queryKey: [PROFILE_ENDPOINT],
        queryFn: () => profileService.getProfile(),
        staleTime: 5 * 60 * 1000,
        retry: false,
        refetchOnWindowFocus: false,
    });

    // Necesario para no entrar en bucle
    useEffect(() => {
        if (query.data) {
            fetchProfile(query.data)
        }
    }, [query.data, fetchProfile])

    return query;
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    const { fetchProfile } = useProfileStore();

    return useMutation<Profile, Error, { updatedUser: Partial<Profile> }>({
        mutationFn: ({ updatedUser }) => profileService.updateUser(updatedUser),
        onSuccess: (data) => {
            fetchProfile(data);
            // console.log(data)
            queryClient.setQueryData([PROFILE_ENDPOINT], data)
        }

    })
}

export const useUpdateStore = () => {
    const queryClient = useQueryClient();
    const { fetchProfile } = useProfileStore();

    return useMutation<Profile, Error, { updatedStore: Partial<Store> }>({
        mutationFn: ({ updatedStore }) => profileService.updateStore(updatedStore),
        onSuccess: (data) => {
            fetchProfile(data);
            queryClient.setQueryData([PROFILE_ENDPOINT], data)
        }

    })
}