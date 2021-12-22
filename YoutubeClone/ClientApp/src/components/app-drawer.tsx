import * as React from 'react';
import { Avatar, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Circle, Explore, History, Home, PlaylistPlay, Subscriptions, ThumbUp, VideoLibrary, WatchLater } from '@mui/icons-material';
import { SubscriptionSummary } from '../api/models';
import AppBarSpacer from './app-bar-spacer';

interface AppDrawerProps {
    open: boolean;
    subscriptions: SubscriptionSummary[];
    onClose?: () => void;
}

function AppDrawer(props: AppDrawerProps) {
    const { open, subscriptions, onClose } = props;
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('md'));
    const variant = isSmall ? 'temporary' : 'permanent';
    const drawerWidth = 240;
    const sx = {
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { position: 'static', width: drawerWidth, boxSizing: 'border-box' },
    };

    return (
        <Drawer anchor="left" open={open} onClose={onClose} ModalProps={{ keepMounted: isSmall }} variant={variant} sx={sx}>
            <List>
                <ListItem button>
                    <ListItemIcon><Home /></ListItemIcon>
                    <ListItemText>Home</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemIcon><Explore /></ListItemIcon>
                    <ListItemText>Explore</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemIcon><Subscriptions /></ListItemIcon>
                    <ListItemText>Subscriptions</ListItemText>
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemIcon><VideoLibrary /></ListItemIcon>
                    <ListItemText>Library</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemIcon><History /></ListItemIcon>
                    <ListItemText>History</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemIcon><VideoLibrary /></ListItemIcon>
                    <ListItemText>Your Videos</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemIcon><WatchLater /></ListItemIcon>
                    <ListItemText>Watch later</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemIcon><ThumbUp /></ListItemIcon>
                    <ListItemText>Liked videos</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemIcon><PlaylistPlay /></ListItemIcon>
                    <ListItemText>Favourites</ListItemText>
                </ListItem>
                <Divider />
                {
                    subscriptions.map(s => (
                        <ListItem key={s.id} secondaryAction={<Circle />} button>
                            <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} src={s.channelThumbnailUrl} /></ListItemIcon>
                            <ListItemText primaryTypographyProps={{ noWrap: true }}>{s.channelName}</ListItemText>
                        </ListItem>
                    ))
                }
            </List>
        </Drawer>
    );
}

export default AppDrawer;