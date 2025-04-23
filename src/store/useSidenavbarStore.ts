import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SidenavbarState {
    isOpen: boolean;
    isToggle: boolean;
    titleToTopBar: string;
    setIsOpen: (status? : boolean) => void;
    setToggle: (status? : boolean) => void;
    setTitleToTopBar: (title : string) => void;
}

const useSidenavbarStore = create<SidenavbarState>()(
    devtools(
        (set) => ({
            isOpen: false,
            isToggle: false,
            titleToTopBar: '',
            setIsOpen: (status) => {
                set((state) => ({
                    isOpen: status !== null ? status : !state.isOpen
                }))
            },
            setToggle: (status) => {
                set((state) => ({
                    isToggle: status ? status : !state.isToggle
                }))
            },
            setTitleToTopBar: (title) => {
                set({
                    titleToTopBar: title
                })
            },
        }),
{ name: "SidenavbarStore" }
    )
)

export default useSidenavbarStore;