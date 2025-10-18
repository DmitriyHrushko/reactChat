import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { persistor, store } from './app/store';
import { theme } from './app/theme';
import './App.css';

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<RouterProvider router={router} />
				</ThemeProvider>
			</PersistGate>
		</Provider>
	);
}

export default App;
