import './App.css';
import { Home } from './pages/home';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Authorization } from './pages/authorization';

const queryClient = new QueryClient();

const router = createHashRouter([
    {
        path: '/',
        element: <Home />,
        // loader: rootLoader,
    },
    {
        path: '/unauthorized',
        element: <div>unauthorized</div>,
    },
    {
        path: '/*',
        element: <Authorization />,
    },
]);

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
