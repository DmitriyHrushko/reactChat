import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { productApi } from '../services/productApi';
import productReducer from '../features/products/productSlice';
import authReducer from '../features/auth/authSlice';

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	// Only persist specific reducers
	whitelist: ['localProducts', 'auth', productApi.reducerPath],
};

const rootReducer = combineReducers({
	[productApi.reducerPath]: productApi.reducer,

	// Feature reducers
	localProducts: productReducer,

	auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore redux-persist actions
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(productApi.middleware),
	devTools: import.meta.env.MODE !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
