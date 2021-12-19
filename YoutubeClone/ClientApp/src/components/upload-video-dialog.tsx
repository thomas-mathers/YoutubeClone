import { Dialog, DialogContent, useMediaQuery, useTheme, Stack, Button, TextField, Select, MenuItem, SelectChangeEvent, InputLabel, FormControl } from "@mui/material"
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
    onClose: () => void;
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
    UpdateChannel,
    UpdateChannels,
    UpdateTitle,
    UpdateDescription,
    UpdateVideo,
    UpdateThumbnail
}

interface UploadVideoAction {
    type: UploadVideoActionType;
    payload: any;
}

const reducer = (state: UploadVideoState, action: UploadVideoAction): UploadVideoState => {
    const { type, payload } = action;
    switch (type) {
        case UploadVideoActionType.UpdateChannels:
            return {
                ...state,
                channels: payload
            }
        case UploadVideoActionType.UpdateChannel:
            return {
                ...state,
                channelId: payload
            }
        case UploadVideoActionType.UpdateTitle:
            return {
                ...state,
                title: payload
            }
        case UploadVideoActionType.UpdateDescription:
            return {
                ...state,
                description: payload
            }
        case UploadVideoActionType.UpdateVideo:
            return {
                ...state,
                videoFile: payload
            }
        case UploadVideoActionType.UpdateThumbnail:
            return {
                ...state,
                thumbnailFile: payload
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

    const { channels, channelId, title, description, videoFile, thumbnailFile } = state;

    const handleChangeChannels = useCallback((channels: ChannelSummary[]) => {
        dispatch({ type: UploadVideoActionType.UpdateChannels, payload: channels });
    }, [])

    const handleChangeChannel = useCallback((e: SelectChangeEvent<string>) => {
        dispatch({ type: UploadVideoActionType.UpdateChannel, payload: e.target.value });
    }, []);

    const handleChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: UploadVideoActionType.UpdateTitle, payload: e.target.value });
    }, []);

    const handleChangeDescription = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch({ type: UploadVideoActionType.UpdateDescription, payload: e.target.value });
    }, []);

    const handleSelectVideoFile = useCallback((file: File | null) => {
        dispatch({ type: UploadVideoActionType.UpdateVideo, payload: file });
    }, []);

    const handleSelectThumbnailFile = useCallback((file: File | null) => {
        dispatch({ type: UploadVideoActionType.UpdateThumbnail, payload: file });
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
            await createChannelVideo(token, channelId, body);
            onClose();
        } catch (e) {
            console.error(e);
        }
    }, [token, channelId, title, description, videoFile, thumbnailFile, onClose]);

    useEffect(() => {
        getUserChannels(token, user.id).then(page => page.rows).then(handleChangeChannels);
    }, [token, user, handleChangeChannels]);

    return (
        <Dialog open={open} fullScreen={fullScreen} onClose={onClose} maxWidth="md" fullWidth>
            <BootstrapDialogTitle onClose={onClose}>Upload video</BootstrapDialogTitle>
            <DialogContent dividers>
                <Stack spacing={2}>
                    <FormControl>
                        <InputLabel id="Channel">Channel</InputLabel>
                        <Select labelId="Channel" label="Channel" value={channelId} onChange={handleChangeChannel}>
                            {
                                channels.map(c => <MenuItem value={c.id}>{c.name}</MenuItem>)
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
            </DialogContent>
        </Dialog>
    )
}

export default UploadVideoDialog;