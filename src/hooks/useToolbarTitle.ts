import ROUTES_METADATA from '@/routes/routesMetadata';
import useSidenavbarStore from '@/store/useSidenavbarStore';
import { useEffect } from 'react';
import { matchPath, useLocation } from 'react-router-dom'

export const useToolbarTittle = () => {
	const location = useLocation();
	const  { setTitleToTopBar } = useSidenavbarStore();

	useEffect(() => {
		const pathname = location.pathname;
		const matched = Object.entries(ROUTES_METADATA).find(([ path ]) => matchPath(path, pathname));

		const title = matched?.[1].title ?? "No title";
		setTitleToTopBar(title);
	}, [location.pathname])
}