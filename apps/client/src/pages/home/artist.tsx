import { Box, Card, CardMedia, debounce, Theme, Typography } from '@mui/material';
import { IArtist } from '../../interfaces/artist.interface.ts';
import TextOverflow from 'react-text-overflow';
import { useEffect, useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSelectionStore } from '../../stores/selections.store';

export function Artist(artist: IArtist) {
    const [selected, setSelected] = useState(false);

    const { select, unselect } = useSelectionStore();

    useEffect(
        debounce(() => {
            const params = [artist.id, 'artist'] as const;
            selected ? select(...params) : unselect(...params);
        }, 1000),
        [selected],
    );

    return (
        <Box
            onClick={() => setSelected((prev) => !prev)}
            sx={{
                mx: '8px',
                userSelect: 'None',
            }}
        >
            <Card
                sx={{
                    borderRadius: 4,
                    position: 'relative',
                }}
            >
                <CardMedia
                    image={artist.picture}
                    sx={{
                        width: '100%',
                        aspectRatio: '1',
                    }}
                />
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
            </Card>
            <Typography
                sx={{
                    textAlign: 'center',
                    fontSize: { xs: 14, md: 24, lg: 34 },
                    fontWeight: 'bold',
                    color: '#00000',
                    zIndex: 100,
                    mt: '-3px',
                }}
                color={'text.primary'}
            >
                <TextOverflow text={artist.name} startPos={10} />
            </Typography>
        </Box>
    );
}
