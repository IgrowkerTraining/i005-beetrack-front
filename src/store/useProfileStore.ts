import { Profile } from '@/types/profileTypes';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ProfileState {
    profile: Profile | null;
    fetchProfile: (profile: Profile) => void;
    editProfile: (profile: Profile) => void;
}

const useProfileStore = create<ProfileState>()(
    devtools(
        // persist(
            (set) => ({
                profile: null,
                fetchProfile: (profile: Profile) => set({ profile }),
                editProfile: (profile: Profile) => set({ profile })
            }),
            // { name: "profile", partialize: ({ profile }) => ({
            //     profile,
            // }) }
        // ), 
        { name: 'ProfileStore' }
    )
)

export default useProfileStore;