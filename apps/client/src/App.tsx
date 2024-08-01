import './App.css';
import { Home } from './pages/home';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { getEvent } from './queries/event.query.ts';

const queryClient = new QueryClient();

const router = createHashRouter([
    {
        path: '/*',
        element: <Home />,
        loader: async ({ params }) => getEvent(params['*']),
    },
    {
        path: '/unauthorized',
        element: <div>unauthorized</div>,
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
