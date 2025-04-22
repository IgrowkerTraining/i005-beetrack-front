import getRoutesMetadata from '@/routes/routesMetadata';
import useProfileStore from '@/store/useProfileStore';
import useSidenavbarStore from '@/store/useSidenavbarStore';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useToolbarTittle = () => {
	const  { profile } = useProfileStore();
	const  { setTitleToTopBar } = useSidenavbarStore();
	const location = useLocation();

	useEffect(() => {
		const metadata = getRoutesMetadata(profile?.store.name)
		const pathname: string = location.pathname;

		const routeTitle = metadata[pathname]?.title ?? "";
		setTitleToTopBar(routeTitle)
	}, [location.pathname])
}