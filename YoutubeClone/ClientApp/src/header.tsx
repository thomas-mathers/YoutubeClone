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
            <Stack direction="row" spacing={1} padding={1} alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={1}>
                    <HamburgerButton onClick={openAppDrawer} />
                    <AppDrawer open={appDrawerOpen} onClose={closeAppDrawer} />
                    <Hidden mdDown>
                        <Logo />
                    </Hidden>
                </Stack>
                <Box flexGrow={0} flexShrink={1} flexBasis={720}>
                    <SearchField />
                </Box>
                <Stack direction="row" spacing={2}>
                    <CreateButton />
                    <LoginButton />
                    <AccountMenu />
                </Stack>
            </Stack>
        </AppBar>
    )
}

export default Header;
