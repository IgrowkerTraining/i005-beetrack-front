import getRoutesMetadata from '@/routes/routesMetadata';
import useProfileStore from '@/store/useProfileStore';
import useSidenavbarStore from '@/store/useSidenavbarStore';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useTopbarTitle = () => {
  const { profile } = useProfileStore();
  const { setTitleToTopBar } = useSidenavbarStore();
  const location = useLocation();

  useEffect(() => {
    const pathname: string = location.pathname;
    const metadata = getRoutesMetadata();

	
    // Si estamos en la raíz, usamos el nombre del store
    if (pathname === "/") {
		const storeName = profile?.store.name || "Inicio";
		setTitleToTopBar(storeName);
		return;
    }

    const routeTitle = metadata[pathname]?.title ?? "";
    setTitleToTopBar(routeTitle);
  }, [location.pathname, profile, setTitleToTopBar]);
};