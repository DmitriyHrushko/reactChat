import { createTheme } from '@mui/material/styles';

export const themeUtils = {
	pxToRem: (px: number) => `${px / 16}rem`,

	textShadow: {
		light: '0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.1)',
		dark: '0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.5)',
	},

	transition: {
		fast: 'all 0.2s ease',
		medium: 'all 0.3s ease',
		slow: 'all 0.5s ease',
	},
};

export const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#2563eb', // Modern blue
			light: '#60a5fa',
			dark: '#1e40af',
			contrastText: '#ffffff',
		},
		secondary: {
			main: '#7c3aed', // Purple accent
			light: '#a78bfa',
			dark: '#5b21b6',
			contrastText: '#ffffff',
		},
		success: {
			main: '#10b981',
			light: '#34d399',
			dark: '#059669',
		},
		error: {
			main: '#ef4444',
			light: '#f87171',
			dark: '#dc2626',
		},
		warning: {
			main: '#f59e0b',
			light: '#fbbf24',
			dark: '#d97706',
		},
		info: {
			main: '#3b82f6',
			light: '#60a5fa',
			dark: '#2563eb',
		},
		background: {
			default: '#f8fafc', // Soft grey-blue
			paper: '#ffffff',
		},
		text: {
			primary: '#1e293b',
			secondary: '#64748b',
		},
		divider: '#e2e8f0',
	},
	typography: {
		fontFamily: [
			'Inter',
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
		].join(','),
		h1: {
			fontWeight: 'bold',
			letterSpacing: '-0.02em',
		},
		h2: {
			fontWeight: 'bold',
			letterSpacing: '-0.01em',
		},
		h3: {
			fontWeight: 600,
			letterSpacing: '-0.01em',
		},
		h4: {
			fontWeight: 600,
		},
		h5: {
			fontWeight: 600,
		},
		h6: {
			fontWeight: 600,
		},
		button: {
			fontWeight: 'medium',
			letterSpacing: '0.02em',
		},
	},
	shape: {
		borderRadius: 12,
	},
	shadows: [
		'none',
		'0 1px 2px 0 rgb(0 0 0 / 0.05)',
		'0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
		'0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
		'0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
		'0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
		'0 25px 50px -12px rgb(0 0 0 / 0.25)',
		'0 25px 50px -12px rgb(0 0 0 / 0.25)',
		'0 25px 50px -12px rgb(0 0 0 / 0.25)',
		'0 25px 50px -12px rgb(0 0 0 / 0.25)',
		'0 25px 50px -12px rgb(0 0 0 / 0.25)',
		'0 25px 50px -12px rgb(0 0 0 / 0.25)',
		'0 25px 50px -12px rgb(0 0 0 / 0.25)',
		'0 25px 50px -12px rgb(0 0 0 / 0.25)',
		'0 25px 50px -12px rgb(0 0 0 / 0.25)',
		'0 25px 50px -12px rgb(0 0 0 / 0.25)',
		'0 25px 50px -12px rgb(0 0 0 / 0.25)',
		'0 25px 50px -12px rgb(0 0 0 / 0.25)',
		'0 25px 50px -12px rgb(0 0 0 / 0.25)',
		'0 25px 50px -12px rgb(0 0 0 / 0.25)',
		'0 25px 50px -12px rgb(0 0 0 / 0.25)',
		'0 25px 50px -12px rgb(0 0 0 / 0.25)',
		'0 25px 50px -12px rgb(0 0 0 / 0.25)',
		'0 25px 50px -12px rgb(0 0 0 / 0.25)',
		'0 25px 50px -12px rgb(0 0 0 / 0.25)',
	],
	components: {
		MuiCssBaseline: {
			styleOverrides: `
        * {
          transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
        }
      `,
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					fontWeight: 'medium',
					padding: '0.625rem 1.25rem',
					boxShadow: 'none',
					transition: 'all 0.2s ease',
					'&:hover': {
						boxShadow: '0 0.25rem 0.75rem rgba(37, 99, 235, 0.2)',
						transform: 'translateY(-0.0625rem)',
					},
					'&:active': {
						transform: 'translateY(0)',
					},
				},
				contained: {
					background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
					'&:hover': {
						background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
					},
				},
				outlined: {
					borderWidth: '0.125rem',
					'&:hover': {
						borderWidth: '0.125rem',
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
					transition: 'all 0.3s ease',
					'&:hover': {
						boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
					},
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundImage: 'none',
				},
				elevation1: {
					boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
				},
				elevation2: {
					boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
				},
				elevation3: {
					boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-root': {
						transition: 'all 0.2s ease',
						'&:hover': {
							'& > fieldset': {
								borderColor: '#2563eb',
							},
						},
						'&.Mui-focused': {
							'& > fieldset': {
								borderWidth: '0.125rem',
							},
						},
					},
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					fontWeight: 'medium',
				},
				filled: {
					boxShadow: '0 0.0625rem 0.125rem 0 rgb(0 0 0 / 0.05)',
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
					background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					fontWeight: 'medium',
					fontSize: '1rem',
					transition: 'all 0.2s ease',
					'&:hover': {
						color: '#2563eb',
						opacity: 1,
					},
				},
			},
		},
		MuiAlert: {
			styleOverrides: {
				root: {
					borderRadius: '0.75rem',
				},
				standardInfo: {
					backgroundColor: '#eff6ff',
					color: '#1e40af',
					'& .MuiAlert-icon': {
						color: '#2563eb',
					},
				},
				standardSuccess: {
					backgroundColor: '#f0fdf4',
					color: '#166534',
					'& .MuiAlert-icon': {
						color: '#10b981',
					},
				},
				standardWarning: {
					backgroundColor: '#fffbeb',
					color: '#92400e',
					'& .MuiAlert-icon': {
						color: '#f59e0b',
					},
				},
				standardError: {
					backgroundColor: '#fef2f2',
					color: '#991b1b',
					'& .MuiAlert-icon': {
						color: '#ef4444',
					},
				},
			},
		},
	},
});
