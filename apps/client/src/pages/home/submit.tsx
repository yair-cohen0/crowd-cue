import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SubmitDialog } from './submitDialog.tsx';
import { useCallback, useEffect, useState } from 'react';
import { useSelectionStore } from '../../stores/selections.store.ts';
import { useMutation } from 'react-query';
import { sendVote } from '../../queries/vote.mutation.ts';
import { SelectionObject } from 'types';

export function Submit() {
    const { selection } = useSelectionStore();

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    const voteMutation = useMutation({
        mutationFn: ({ selection }: { selection: SelectionObject }) => sendVote(selection),
    });

    const sendSelection = useCallback(() => {
        voteMutation.mutate({ selection });
    }, [selection]);

    useEffect(() => {
        switch (voteMutation.status) {
            case 'success':
                window.location.hash = 'success';
                break;
            case 'error':
                window.location.hash = 'unauthorized';
                break;
        }
    }, [voteMutation.status]);

    return (
        <>
            <ChevronRightIcon
                onClick={openDialog}
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
            <SubmitDialog isOpen={isDialogOpen} handleClose={closeDialog} handleSubmit={sendSelection} />
        </>
    );
}
