import * as React from 'react';
import { IconButton } from "@mui/material";
import { VideoCall } from '@mui/icons-material';

interface CreateButtonProps {
    onClick?: () => void;
}

function UploadVideoButton(props: CreateButtonProps) {
    const { onClick } = props;
    return (
        <IconButton onClick={onClick}>
            <VideoCall />
        </IconButton>
    )
}

export default UploadVideoButton;