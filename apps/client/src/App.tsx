import './App.css';
import { Home } from './pages/home';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { auth } from './queries/auth.query.ts';
import { getEvent } from './queries/event.query.ts';
import { useAuthStore } from './stores/auth.store.ts';

const queryClient = new QueryClient();

const router = createHashRouter([
    {
        path: '/success',
        element: <div>thank you</div>,
    },
    {
        path: '/*',
        element: <Home />,
        loader: async ({ params }) => {
            const token = params['*'];
            if (await auth(token)) {
                useAuthStore.getState().setToken(token);
                return getEvent(token);
            } else {
                return null;
            }
        },
    },
    {
        path: '/',
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
