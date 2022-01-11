import * as React from 'react';
import { useMemo } from 'react';
import { Avatar, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Circle, Explore, History, Home, PlaylistPlay, Subscriptions, ThumbUp, VideoLibrary, WatchLater } from '@mui/icons-material';
import { getUserSubscriptions } from '../api/services/user-service';
import { useAuthService } from '../hooks/use-auth-service';
import { useInfiniteQuery } from 'react-query';

interface AppDrawerProps {
    open: boolean;
    onClose?: () => void;
}

function AppDrawer(props: AppDrawerProps) {
    const { open, onClose } = props;

    const { token, user } = useAuthService();

    const { data: subscriptionPages } = useInfiniteQuery(
        ['subscriptions'],
        ({ pageParam = undefined }) => getUserSubscriptions({ token: token!, userId: user!.id, continueToken: pageParam }),
        {
            getNextPageParam: (lastPage,) => lastPage.continueToken ?? undefined
        });

    const subscriptions = useMemo(() => {
        if (!subscriptionPages) {
            return [];
        }
        return subscriptionPages.pages.flatMap(x => x.rows);
    }, [subscriptionPages]);

    return (
        <Drawer anchor="left" open={open} onClose={onClose} PaperProps={{ sx: { width: 240 } }}>
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