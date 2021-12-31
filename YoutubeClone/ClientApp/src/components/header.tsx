import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { AppBar, Box, Hidden, Stack } from '@mui/material';
import HamburgerButton from './hamburger-button';
import Logo from './logo';
import SearchField from './search-field';
import { useDebounce } from '../hooks/use-debounce';
import { getVideoSuggestions } from '../api/services/video-suggestions';
import { useNavigate } from 'react-router-dom';
import UploadVideoButton from './upload-video-button';
import AccountMenuButton from './account-menu-button';
import LoginButton from './login-button';
import UploadVideoDialog from './upload-video-dialog';
import { useAuthService } from '../hooks/use-auth-service';

interface HeaderProps {
    onOpenDrawer: () => void;
}

const Header = (props: HeaderProps) => {
    const { onOpenDrawer } = props;

    const [searchText, setSearchText] = useState<string>('');
    const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
    const [isUploadDialogOpen, setIsUploadDialogOpen] = useState<boolean>(false);

    const debouncedSearchText = useDebounce(searchText, 500);

    const navigate = useNavigate();

    const { user, logout } = useAuthService();

    const handleClickSearch = useCallback((searchText: string) => {
        const queryParams = new URLSearchParams({ 'search_query': searchText });
        const queryParamsString = queryParams.toString();

        navigate(`/results?${queryParamsString}`);
    }, [navigate]);

    useEffect(() => {
        if (debouncedSearchText.length > 0) {
            getVideoSuggestions(debouncedSearchText, 10).then(setSearchSuggestions);
        } else {
            setSearchSuggestions([]);
        }
    }, [debouncedSearchText, setSearchSuggestions]);

    return (
        <>
            <AppBar color="default" position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Stack direction="row" spacing={1} padding={1} justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1}>
                        <HamburgerButton onClick={onOpenDrawer} />
                        <Hidden mdDown>
                            <Logo />
                        </Hidden>
                    </Stack>
                    <Box flexGrow={0} flexShrink={1} flexBasis={720}>
                        <SearchField value={searchText} onChange={setSearchText} options={searchSuggestions} onSearch={handleClickSearch} />
                    </Box>
                    <Stack direction="row" spacing={1}>
                        {
                            user ?
                                <>
                                    <UploadVideoButton onClick={() => setIsUploadDialogOpen(true)} />
                                    <AccountMenuButton onClickLogout={logout} />
                                </>
                                :
                                <LoginButton />
                        }
                    </Stack>
                </Stack>
            </AppBar>
            <UploadVideoDialog open={isUploadDialogOpen} onClose={() => setIsUploadDialogOpen(false)} />
        </>
    )
}

export default Header;
