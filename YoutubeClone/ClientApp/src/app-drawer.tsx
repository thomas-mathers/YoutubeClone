import * as React from 'react';
import { Explore, Home, Subscriptions, VideoLibrary, History, WatchLater, ThumbUp, PlaylistPlay, Circle } from '@mui/icons-material';
import { Avatar, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, ListSubheader, useMediaQuery, useTheme } from '@mui/material';
import AppBarSpacer from './app-bar-spacer';

interface AppDrawerProps {
    open: boolean;
    onClose?: () => void;
}

function AppDrawer({ open, onClose }: AppDrawerProps) {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('md'));
    const variant = isSmall ? 'temporary' : 'permanent';
    const drawerWidth = 240;
    const sx = {
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
    };

    return (
        <Drawer anchor="left" open={false} onClose={onClose} ModalProps={{ keepMounted: isSmall }} variant={variant} sx={sx}>
            <AppBarSpacer />
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
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }}/></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
                <ListItem button secondaryAction={<Circle />}>
                    <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>Anthony Brian Logan</ListItemText>
                </ListItem>
            </List>
        </Drawer>
    );
}

export default AppDrawer;