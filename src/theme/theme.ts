import { createSystem, defaultConfig } from '@chakra-ui/react';

const customStyles = createSystem(defaultConfig, {
	theme: {
		breakpoints: {
			xs: "280px",
		},
		tokens: {
			fonts: {
				body: { value: `'Montserrat', sans-serif` },
				heading: { value: `'Montserrat', sans-serif` },
			},
			colors: {
				sidenavbar: {
					light: { value: "#f7f9fc" },
					dark: { value: "#242424" }
				},
				content: {
					light: { value: "#f2f2f2" },
					dark: { value: "#363636" }
				},
				yellow: {
					"amarillo": { value: "#ffd701" },
					50: { value: '#fff9e6' },
					200: { value: '#ffe28d' },
					300: { value: '#ffd559' },
					400: { value: '#ffcd39' },
					500: { value: '#ffc107' },
					700: { value: '#b58905' },
				},
				green: {
					50: { value: '#f1fbf7' },
					200: { value: '#bfecd9' },
					300: { value: '#a2e4c8' },
					400: { value: '#90debd' },
					500: { value: '#74d6ad' },
					700: { value: '#52987b' }
				},
				blue: {
					50: { value: '#e7e9eb' },
					200: { value: '#9298a1' },
					300: { value: '#606976' },
					400: { value: '#414c5c' },
					500: { value: '#121f33' },
					700: { value: '#0d1624' }
				},
				black: {
					light: { value: '#e6e6e6' },
					lightHover: { value: '#d9d9d9' },
					lightActive: { value: '#b0b0b0' },
					normal: { value: '#000000' },
					normalHover: { value: '#000000' },
					normalActive: { value: '#000000' }
				},
				stock: {
					low: { value: '#f23030' },
					medium: { value: '#f86b40' },
					good: { value: '#2ce281' },
				},
				background:{
					white: { value: '#ffffff' },
					25: { value: '#f7f9fc' },
					50: { value: '#e7e9eb' },
					100: { value: '#b6bac0' },
					200: { value: '#9298A1' },
					300: { value: '#606976' },
				},
				chart: {
					bg: { value: '#0f2027' },
					gradient: { value: 'linear(to-br, #0f2027, #203a43, #2c5364)' }
				  }
			},
			shadows: {
				soft: { value: '0 2px 4px rgba(0, 0, 0, 0.05)' },
				softer: { value: '0 4px 8px rgba(0, 0, 0, 0.04)' },
				ultraSoft: { value: '0 8px 24px rgba(0, 0, 0, 0.03)' },
			  },
		},
		semanticTokens: {
			colors: {
				navItem: {
					solid: { value: "{colors.yellow.amarillo}" },
					contrast: { value: "{colors.yellow.100}" },
          			fg: { value: "{colors.black.normal}" },
					muted: { value: "{colors.yellow.100}" },
					subtle: { value: "{colors.yellow.400}" },
					emphasized: { value: "{colors.yellow.300}" },
					focusRing: { value: "{colors.yellow.500}" },
				}
			}
		},
	}
})

export default customStyles;