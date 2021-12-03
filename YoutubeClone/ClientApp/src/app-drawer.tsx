import { Explore, Home, Subscriptions, VideoLibrary, History } from '@mui/icons-material';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

interface AppDrawerProps {
    open: boolean;
    onClose: () => void;
}

const AppDrawer = ({ open, onClose }: AppDrawerProps) => (
    <Drawer anchor="left" open={open} onClose={onClose}>
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
            <Divider />
        </List>
    </Drawer>
)

export default AppDrawer;