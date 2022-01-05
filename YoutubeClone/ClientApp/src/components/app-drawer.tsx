import * as React from 'react';
import { useCallback, useEffect, useReducer } from 'react';
import { Avatar, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Circle, Explore, History, Home, PlaylistPlay, Subscriptions, ThumbUp, VideoLibrary, WatchLater } from '@mui/icons-material';
import { SubscriptionSummary } from '../api/models';
import { getUserSubscriptions } from '../api/services/user-service';
import { useAuthService } from '../hooks/use-auth-service';

interface AppDrawerState {
    subscriptions: SubscriptionSummary[];
    fetchSubscriptionsContinueToken?: string | null;
    fetchSubscriptions: boolean;
    fetchSubscriptionsError: string;
}

enum AppDrawerActionType {
    ClearSubscriptions,
    FetchSubscriptions,
    FetchSubscriptionsSuccess,
    FetchSubscriptionsFailure
}

interface AppDrawerAction {
    type: AppDrawerActionType;
    payload?: any;
}

const initialState: AppDrawerState = {
    subscriptions: [],
    fetchSubscriptions: false,
    fetchSubscriptionsError: ''
}

const reducer = (state: AppDrawerState, action: AppDrawerAction): AppDrawerState => {
    switch (action.type) {
        case AppDrawerActionType.ClearSubscriptions:
            return {
                ...state,
                subscriptions: []
            }
        case AppDrawerActionType.FetchSubscriptions:
            return {
                ...state,
                fetchSubscriptions: true,
                fetchSubscriptionsError: '',
            }
        case AppDrawerActionType.FetchSubscriptionsSuccess:
            return {
                ...state,
                subscriptions: state.subscriptions.concat(action.payload.rows),
                fetchSubscriptionsContinueToken: action.payload.continueToken,
                fetchSubscriptions: false
            }
        case AppDrawerActionType.FetchSubscriptionsFailure:
            return {
                ...state,
                fetchSubscriptions: false,
                fetchSubscriptionsError: action.payload
            }
        default:
            return state;
    }
}

interface AppDrawerProps {
    open: boolean;
    onClose?: () => void;
}

const drawerWidth = 240;

const sx = {
    width: drawerWidth,
    flexShrink: 0,
    [`& .MuiDrawer-paper`]: { position: 'static', width: drawerWidth, boxSizing: 'border-box' },
};

function AppDrawer(props: AppDrawerProps) {
    const { open, onClose } = props;
    const [state, dispatch] = useReducer(reducer, initialState);
    const { subscriptions } = state;

    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('md'));
    const variant = isSmall ? 'temporary' : 'permanent';

    const { token, user } = useAuthService();

    const fetchSubscriptions = useCallback(async (continueToken?: string | null) => {
        if (token && user && continueToken !== null) {
            try {
                dispatch({ type: AppDrawerActionType.FetchSubscriptions });
                const page = await getUserSubscriptions(token, user.id, continueToken);
                dispatch({ type: AppDrawerActionType.FetchSubscriptionsSuccess, payload: page });
            } catch (e) {
                dispatch({ type: AppDrawerActionType.FetchSubscriptionsFailure });
            }
        }
    }, [token, user]);

    const clearSubscriptions = useCallback(() => dispatch({ type: AppDrawerActionType.ClearSubscriptions }), []);

    useEffect(() => {
        if (token && user) {
            fetchSubscriptions();
        } else {
            clearSubscriptions();
        }
    }, [token, user, fetchSubscriptions, clearSubscriptions]);

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