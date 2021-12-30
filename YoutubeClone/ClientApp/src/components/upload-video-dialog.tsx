import { Dialog, DialogContent, useMediaQuery, useTheme, Stack, Button, TextField, Select, MenuItem, SelectChangeEvent, InputLabel, FormControl, CircularProgress, Box } from "@mui/material"
import { MouseEvent } from "react";
import { useEffect } from "react";
import { ChangeEvent, useCallback, useReducer } from "react";
import { ChannelSummary, UserSummary } from "../api/models";
import { createChannelVideo } from "../api/services/channel-service";
import { getUserChannels } from "../api/services/user-service";
import BootstrapDialogTitle from "./bootstrap-dialog-title";
import OutlinedBox from "./outlined-box";
import UploadFile from "./upload-file";

interface UploadVideoProps {
    token: string;
    user: UserSummary;
    open: boolean;
    onClose: (success: boolean) => void;
}

interface UploadVideoState {
    channels: ChannelSummary[];
    channelId?: string;
    title: string;
    description: string;
    videoFile: File | null;
    thumbnailFile: File | null;
    loading: boolean;
    errorMessage: string;
}

enum UploadVideoActionType {
    UpdateFormField,
    UploadVideo,
    UploadVideoSuccess,
    UploadVideoFailure
}

interface UploadVideoAction {
    type: UploadVideoActionType;
    payload?: any;
}

const reducer = (state: UploadVideoState, action: UploadVideoAction): UploadVideoState => {
    const { type, payload } = action;
    switch (type) {
        case UploadVideoActionType.UpdateFormField:
            const { field, value } = payload;
            return {
                ...state,
                [field]: value
            }
        case UploadVideoActionType.UploadVideo:
            return {
                ...state,
                loading: true,
                errorMessage: ''
            }
        case UploadVideoActionType.UploadVideoSuccess:
            return {
                ...state,
                loading: false
            }
        case UploadVideoActionType.UploadVideoFailure:
            return {
                ...state,
                loading: false,
                errorMessage: payload
            }
        default:
            return state;
    }
};

const initialState: UploadVideoState = {
    channels: [],
    title: '',
    description: '',
    videoFile: null,
    thumbnailFile: null,
    loading: false,
    errorMessage: ''
};

const UploadVideoDialog = (props: UploadVideoProps) => {
    const { token, user, open, onClose } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [state, dispatch] = useReducer(reducer, initialState);

    const { channels, channelId, title, description, videoFile, thumbnailFile, loading } = state;

    const handleClickClose = useCallback(() => {
        onClose(false);
    }, [onClose]);

    const handleChangeChannels = useCallback((channels: ChannelSummary[]) => {
        dispatch({ type: UploadVideoActionType.UpdateFormField, payload: { field: 'channels', value: channels } });
    }, [])

    const handleChangeChannel = useCallback((e: SelectChangeEvent<string>) => {
        dispatch({ type: UploadVideoActionType.UpdateFormField, payload: { field: 'channelId', value: e.target.value } });
    }, []);

    const handleChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: UploadVideoActionType.UpdateFormField, payload: { field: 'title', value: e.target.value } });
    }, []);

    const handleChangeDescription = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch({ type: UploadVideoActionType.UpdateFormField, payload: { field: 'description', value: e.target.value } });
    }, []);

    const handleSelectVideoFile = useCallback((file: File | null) => {
        dispatch({ type: UploadVideoActionType.UpdateFormField, payload: { field: 'videoFile', value: file } });
    }, []);

    const handleSelectThumbnailFile = useCallback((file: File | null) => {
        dispatch({ type: UploadVideoActionType.UpdateFormField, payload: { field: 'thumbnailFile', value: file } });
    }, []);

    const handleClickUpload = useCallback(async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (videoFile === null) {
            return;
        }
        if (thumbnailFile === null) {
            return;
        }
        if (channelId === undefined) {
            return;
        }
        var body = { title: title, description: description, videoFile: videoFile, thumbnailFile: thumbnailFile };

        try {
            dispatch({ type: UploadVideoActionType.UploadVideo });
            await createChannelVideo(token, channelId, body);
            dispatch({ type: UploadVideoActionType.UploadVideoSuccess });
            onClose(true);
        } catch (e) {
            dispatch({ type: UploadVideoActionType.UploadVideoFailure });
        }
    }, [token, channelId, title, description, videoFile, thumbnailFile, onClose]);

    useEffect(() => {
        if (token && user) {
            getUserChannels(token, user.id).then(page => page.rows).then(handleChangeChannels);
        }
    }, [token, user, handleChangeChannels]);

    return (
        <Dialog open={open} fullScreen={fullScreen} onClose={handleClickClose} maxWidth="md" fullWidth disableEscapeKeyDown>
            <BootstrapDialogTitle onClose={handleClickClose}>Upload video</BootstrapDialogTitle>
            <DialogContent dividers>
                {
                    loading ?
                        <Box height={300} display="flex" justifyContent="center" alignItems="center">
                            <CircularProgress size={200} />
                        </Box>
                        :
                        <Stack spacing={2}>
                            <FormControl>
                                <InputLabel id="Channel">Channel</InputLabel>
                                <Select labelId="Channel" label="Channel" value={channelId} onChange={handleChangeChannel}>
                                    {
                                        channels.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                            <TextField variant="outlined" label="Title" value={title} onChange={handleChangeTitle} />
                            <TextField variant="outlined" label="Description" value={description} onChange={handleChangeDescription} rows={8} multiline />
                            <OutlinedBox label="Video">
                                <UploadFile extensions={['.mp4']} onSelectFile={handleSelectVideoFile} />
                            </OutlinedBox>
                            <OutlinedBox label="Thumbnail">
                                <UploadFile extensions={['.png', '.jpg', '.jpeg', '.bmp', '.gif', '.tga', '.tiff']} onSelectFile={handleSelectThumbnailFile} />
                            </OutlinedBox>
                            <Button variant="contained" onClick={handleClickUpload}>Upload</Button>
                        </Stack>
                }
            </DialogContent>
        </Dialog>
    )
}

export default UploadVideoDialog;