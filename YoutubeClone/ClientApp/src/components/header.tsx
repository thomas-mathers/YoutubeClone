import * as React from 'react';
import { AppBar, Box, Hidden, Stack } from '@mui/material';
import SearchField from './search-field';
import LoginButton from './loginButton';
import HamburgerButton from './hamburger-button';
import Logo from './logo';
import AccountMenu from './account-menu';
import CreateButton from './create-button';
import { UserSummary } from '../api/models';
import { Fragment, useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { getVideoSuggestions } from '../api/services/video-suggestions';

interface HeaderProps {
    user: UserSummary | null;
    openDrawer: () => void;
}

const Header = (props: HeaderProps) => {
    const { user, openDrawer } = props;
    const isLoggedIn = user !== null;
    const [text, setText] = useState('');
    const [options, setOptions] = useState<string[]>([]);
    const debouncedText = useDebounce(text, 300);

    useEffect(() => {
        if (debouncedText.length > 0) {
            getVideoSuggestions(debouncedText, 10).then(setOptions);
        } else {
            setOptions([]);
        }
    }, [debouncedText]);

    return (
        <AppBar color="default" position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Stack direction="row" spacing={1} padding={1} justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={1}>
                    <HamburgerButton onClick={openDrawer}/>
                    <Hidden mdDown>
                        <Logo />
                    </Hidden>
                </Stack>
                <Box flexGrow={0} flexShrink={1} flexBasis={720}>
                    <SearchField value={text} onChange={setText} options={options}/>
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
