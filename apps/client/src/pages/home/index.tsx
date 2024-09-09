import { Box, Theme, Typography } from '@mui/material';
import { GenreCarousel } from './genreCarousel.tsx';
import './index.scss';
import { ArtistCarousel } from './artistCarousle.tsx';
import { SearchBar } from './searchBar.tsx';
import { useEffect, useState } from 'react';
import { Submit } from './submit';
import { useLoaderData } from 'react-router-dom';
import { IEvent } from 'types';

export function Home() {
    const event = useLoaderData() as IEvent;
    useEffect(() => {
        if (!event) {
            window.location.hash = 'unauthorized';
        }
    }, [event]);

    const [artistTerm, setArtistTerm] = useState<string>();
    const [genreTerm, setGenreTerm] = useState<string>();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '15vh',
                    mx: '20px',
                }}
            >
                <Typography
                    component={'h1'}
                    sx={{
                        fontSize: '2rem !important',
                        color: (theme: Theme) => theme.palette.primary.main,
                        textAlign: 'center',
                    }}
                >
                    {event.name}
                </Typography>
            </Box>

            <Box sx={{}}>
                <SearchBar
                    title={'Genre'}
                    sx={{
                        mb: '15px',
                    }}
                    onChange={(e) => setGenreTerm(e.target.value)}
                    debounceTime={1000}
                />
                <GenreCarousel searchTerm={genreTerm} />
            </Box>

            <Box sx={{ height: '50vh' }}>
                <SearchBar
                    title={'Artist'}
                    sx={{
                        mt: '30px',
                        mb: '15px',
                    }}
                    onChange={(e) => setArtistTerm(e.target.value)}
                    debounceTime={1000}
                />

                <ArtistCarousel searchTerm={artistTerm} />
            </Box>

            <Submit />
        </Box>
    );
}
