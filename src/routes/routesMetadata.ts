const getRoutesMetadata = (): Record<string, { title: string }> => ({
	"/": { title: "" }, // lo llenaremos en el hook
	"/home": { title: "Dashboard" },
	"/inventory": { title: "Inventario" },
	"/sales": { title: "Ventas" },
	"/stadistics": { title: "Estadísticas" },
	"/profile": { title: "Perfil" },
	"/notifications": { title: "Notificaciones" },
	"/404": { title: "Página no encontrada" },
  });
  
  export default getRoutesMetadata;