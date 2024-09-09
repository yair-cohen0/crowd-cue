import { Box, debounce, InputAdornment, SxProps, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
export function SearchBar({
    title,
    sx,
    onChange,
    debounceTime = 0,
}: {
    title: string;
    sx?: SxProps;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => unknown;
    debounceTime?: number;
}) {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <TextField
                label={title}
                variant="outlined"
                size="small"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    sx: {
                        borderRadius: '10px',
                        backgroundColor: 'rgba(219.94, 219.94, 219.94, 0.93)',
                        height: '35px',
                    },
                }}
                sx={{
                    width: '80%',
                    ...sx,
                }}
                onChange={debounce((e) => onChange?.(e), debounceTime)}
            />
        </Box>
    );
}
