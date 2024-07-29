import { Box, Card, debounce, Theme, Typography } from '@mui/material';
import { IGenre } from 'types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState } from 'react';
import { useSelectionStore } from '../../stores/selections.store';

export function Genre(genre: IGenre) {
    const [selected, setSelected] = useState(false);

    const { select, unselect } = useSelectionStore();

    useEffect(
        debounce(() => {
            const params = [genre.id, 'genre'] as const;
            selected ? select(...params) : unselect(...params);
        }, 1000),
        [selected],
    );

    return (
        <Card
            onClick={() => setSelected((prev) => !prev)}
            sx={{
                height: '25vh',
                width: '100%',
                position: 'relative',
                borderRadius: 4,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    filter: 'blur(1.5px) brightness(0.6)',
                    objectFit: 'cover',
                }}
                component={'img'}
                src={`data:image/jpeg;base64,${genre.picture}`}
            ></Box>
            {selected ? (
                <>
                    <Card
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.5)',
                            pointerEvents: 'none',
                        }}
                    />
                    <CheckCircleIcon
                        sx={{
                            position: 'absolute',
                            right: 2,
                            bottom: 2,
                            zIndex: 1,
                            color: (theme: Theme) => theme.palette.primary.main,
                            fontSize: {
                                xs: 24,
                                md: 34,
                                xl: 44,
                            },
                        }}
                    />
                </>
            ) : (
                <></>
            )}
            <Typography
                sx={{
                    fontSize: { xs: '30px', md: '40px', lg: '50px' },
                    fontWeight: 'bold',
                    color: '#ffffff',
                    zIndex: 100,
                }}
                color={'text.primary'}
            >
                {genre.name}
            </Typography>
        </Card>
    );
}
