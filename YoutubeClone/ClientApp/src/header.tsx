import * as React from 'react';
import { AppBar, Box, Hidden, Stack } from '@mui/material';
import SearchField from './search-field';
import LoginButton from './loginButton';
import HamburgerButton from './hamburger-button';
import Logo from './logo';
import AccountMenu from './account-menu';
import CreateButton from './create-button';
import UserSummary from './user-summary';
import { Fragment } from 'react';

interface HeaderProps {
    user: UserSummary | null;
}

const Header = (props: HeaderProps) => {
    const { user } = props;
    const isLoggedIn = user !== null;
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
                    {
                        isLoggedIn ?
                            <Fragment>
                                <CreateButton />
                                <AccountMenu />
                            </Fragment>
                            :
                            <LoginButton />
                    }
                </Stack>
            </Stack>
        </AppBar>
    )
}

export default Header;
