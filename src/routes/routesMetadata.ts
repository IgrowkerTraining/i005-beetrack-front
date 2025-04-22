const getRoutesMetadata = (storeName: string = "Welcome"): Record<string, { title: string }> => ({
	"/": { title: storeName },
	"/home": { title: "Dashboard" },
	"/inventory": { title: "Inventario" },
	"/sales": { title: "Ventas" },
	"/stadistics": { title: "Estadísticas" },
	"/profile": { title: "Perfil" },
	"/404": { title: "Página no encontrada" },
	// "/login": { title: "Iniciar sesión" },
	// "/register": { title: "Registro" },
})

export default getRoutesMetadata