import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export function Submit({ handleClick }: { handleClick: () => void }) {
    return (
        <ChevronRightIcon
            onClick={handleClick}
            sx={{
                position: 'fixed',
                right: 6,
                bottom: 6,
                zIndex: 1,
                borderRadius: '50%',
                backgroundColor: (theme) => theme.palette.primary.main,
                fontSize: {
                    xs: 50,
                    md: 70,
                    xl: 80,
                },
            }}
        />
    );
}
