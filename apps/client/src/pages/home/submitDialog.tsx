import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

export function SubmitDialog({
    handleClose,
    handleSubmit,
    isOpen,
}: {
    handleClose: () => void;
    handleSubmit: () => void;
    isOpen: boolean;
}) {
    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>{'Are you finished?'}</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>No Let me Stay</Button>
                <Button
                    onClick={() => {
                        handleClose();
                        handleSubmit();
                    }}
                    autoFocus
                >
                    Yes, Send It!
                </Button>
            </DialogActions>
        </Dialog>
    );
}
