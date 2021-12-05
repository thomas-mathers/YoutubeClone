import * as React from 'react';
import { IconButton } from "@mui/material";
import { VideoCall } from '@mui/icons-material';

function CreateButton() {
    return (
        <IconButton>
            <VideoCall />
        </IconButton>
    )
}

export default CreateButton;