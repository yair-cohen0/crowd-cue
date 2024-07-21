import { Box, Theme, Typography } from '@mui/material';
import { GenreCarousel } from './genreCarousel.tsx';
import './index.scss';
import { ArtistCarousel } from './artistCarousle.tsx';
import { SearchBar } from './searchBar.tsx';
import { useState } from 'react';
import { useSelectionStore } from '../../stores/selections.store';
import { Submit } from './submit';
import { SubmitDialog } from './submitDialog';

export function Home() {
    const [artistTerm, setArtistTerm] = useState<string>();
    const [genreTerm, setGenreTerm] = useState<string>();

    const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
    const { selected } = useSelectionStore();

    const handleOpenSubmitDialog = () => {
        setIsSubmitDialogOpen(true);
    };

    const handleCloseSubmitDialog = () => {
        setIsSubmitDialogOpen(false);
    };

    const sendSelection = () => {
        console.log(selected);
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '20%',
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
                    Avishag & Noam’s Wedding
                </Typography>
            </Box>
            <SearchBar
                title={'Genre'}
                sx={{
                    mb: '15px',
                }}
                onChange={(e) => setGenreTerm(e.target.value)}
                debounceTime={1000}
            />
            <GenreCarousel searchTerm={genreTerm} />

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

            <Submit handleClick={handleOpenSubmitDialog} />

            <SubmitDialog
                isOpen={isSubmitDialogOpen}
                handleClose={handleCloseSubmitDialog}
                handleSubmit={sendSelection}
            />
        </>
    );
}
