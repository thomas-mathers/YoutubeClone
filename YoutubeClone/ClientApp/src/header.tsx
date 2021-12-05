import * as React from 'react';
import { AppBar, Box, Hidden, Stack } from '@mui/material';
import SearchField from './search-field';
import LoginButton from './loginButton';
import HamburgerButton from './hamburger-button';
import Logo from './logo';
import AccountMenu from './account-menu';
import CreateButton from './create-button';

const Header = () => {
    return (
        <AppBar color="default" position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Stack direction="row" spacing={1} padding={1} justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={1}>
                    <HamburgerButton/>
                    <Hidden mdDown>
                        <Logo />
                    </Hidden>
                </Stack>
                <Box flexGrow={0} flexShrink={1} flexBasis={720}>
                    <SearchField />
                </Box>
                <Stack direction="row" spacing={1}>
                    <CreateButton />
                    <LoginButton />
                    <AccountMenu />
                </Stack>
            </Stack>
        </AppBar>
    )
}

export default Header;
