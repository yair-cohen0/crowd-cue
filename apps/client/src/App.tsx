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
        path: '/already-voted',
        element: <div>you already voted!</div>,
    },
    {
        path: '/',
        element: <div>unauthorized</div>,
    },
    {
        path: '/*',
        element: <Home />,
        loader: async ({ params }) => {
            const token = params['*'];
            try {
                await auth(token);
                useAuthStore.getState().setToken(token);
                return getEvent(token);
            } catch (e) {
                switch (e.response.data.message) {
                    case 'Already Voted':
                        window.location.hash = '/already-voted';
                        break;
                    default:
                        window.location.hash = '';
                        break;
                }
            }
        },
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
