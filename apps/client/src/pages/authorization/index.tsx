import { useQuery } from 'react-query';
import { getEvent } from '../../queries/event.query.ts';
import { useEffect } from 'react';
import { useEventStore } from '../../stores/event.store.ts';

export function Authorization() {
    const token = window.location.hash.slice(1);
    const { data } = useQuery('event', { queryFn: async () => getEvent(token) });
    const { setEvent, setToken } = useEventStore();

    useEffect(() => {
        if (data) {
            console.log(token);
            setEvent(data);
            setToken(token);
            window.location.hash = '';
        } else {
            window.location.hash = 'unauthorized';
        }
    }, [data]);

    return <div>Checking Token...</div>;
}
