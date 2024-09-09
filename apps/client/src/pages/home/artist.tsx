import { Box, Card, debounce, Theme, Typography } from '@mui/material';
import { IArtist } from 'types';
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
                userSelect: 'None',
                width: '30vw',
                aspectRatio: 1,
            }}
        >
            <Box
                component={'div'}
                sx={{
                    aspectRatio: '1',
                    borderRadius: 4,
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                <Box
                    component={'img'}
                    src={
                        artist.picture ??
                        'https://media-fra5-2.cdn.whatsapp.net/v/t61.24694-24/418758122_759367716386884_1470017999843449425_n.jpg?ccb=11-4&oh=01_Q5AaILTiO1dXIaX-HM95o9RyWF84k0NYyp5cp1RMqS2whXAL&oe=66E5406E&_nc_sid=5e03e0&_nc_cat=108'
                    }
                    sx={{
                        objectFit: 'cover',
                        width: '100%',
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
            </Box>

            <Typography
                sx={{
                    textAlign: 'center',
                    fontSize: { md: 14, lg: 17 },
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
