import {
    Breakpoint,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography
} from '@mui/material';
import React from 'react';
import { HiXMark } from 'react-icons/hi2';
import { Transition } from './Snackbar';

interface DialogBoxProps {
    title: string;
    maxWidth?: Breakpoint;
    isOpen: boolean;
    actions?: React.ReactNode;
    content: React.ReactNode;
    onClose: () => void;
    isClose?: boolean;

}
export const DialogBox: React.FC<DialogBoxProps> = ({
    isOpen,
    onClose,
    title,
    content,
    actions,
    maxWidth = 'lg',
    isClose = true
}) => {
    return (
        <Dialog
            open={isOpen}
            maxWidth={maxWidth}
            onClose={onClose}
            TransitionComponent={Transition}
        >
            <DialogTitle>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {title}
                </Typography>

                {isClose &&
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 10,
                            top: 12,
                        }}
                    >
                        <HiXMark />
                    </IconButton>
                }
            </DialogTitle>
            <DialogContent dividers sx={{pb:5}}>{content}</DialogContent>
            {actions &&
                <DialogActions>{actions}</DialogActions>
            }
        </Dialog>
    );
};





