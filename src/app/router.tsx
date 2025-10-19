import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CreateProductPage } from '../pages/CreateProductPage';
import { EditProductPage } from '../pages/EditProductPage';
import { LoginPage } from '../pages/LoginPage';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

export const router = createBrowserRouter([
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: 'products',
				element: <ProductsPage />,
			},
			{
				path: 'products/createProduct',
				element: (
					<ProtectedRoute>
						<CreateProductPage />
					</ProtectedRoute>
				),
			},
			{
				path: 'products/:id',
				element: <ProductDetailPage />,
			},
			{
				path: 'products/:id/edit',
				element: (
					<ProtectedRoute>
						<EditProductPage />
					</ProtectedRoute>
				),
			},
			{
				path: '*',
				element: <Navigate to='/' replace />,
			},
		],
	},
]);
