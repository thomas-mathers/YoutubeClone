import { AppBar, Box, Hidden, Stack } from '@mui/material';
import SearchField from './search-field';
import LoginButton from './loginButton';
import HamburgerButton from './hamburger-button';
import Logo from './logo';
import AccountMenu from './account-menu';
import CreateButton from './create-button';
import AppDrawer from './app-drawer';
import { useState } from 'react';

const Header = () => {
    const [appDrawerOpen, setAppDrawerOpen] = useState(false);

    const openAppDrawer = () => setAppDrawerOpen(true);
    const closeAppDrawer = () => setAppDrawerOpen(false);

    return (
        <AppBar color="default" position="static">
            <Stack direction="row" spacing={1} padding={1} alignItems="center">
                <HamburgerButton onClick={openAppDrawer} />
                <AppDrawer open={appDrawerOpen} onClose={closeAppDrawer} />
                <Hidden smDown>
                    <Logo />
                </Hidden>
                <Box flex={1}>
                    <SearchField />
                </Box>
                <CreateButton />
                <LoginButton />
                <AccountMenu />
            </Stack>
        </AppBar>
    )
}

export default Header;
