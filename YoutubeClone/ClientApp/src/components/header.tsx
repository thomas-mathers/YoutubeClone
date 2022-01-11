import * as React from 'react';
import { useCallback, useEffect, useReducer } from 'react';
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
import AppDrawer from './app-drawer';

interface HeaderState {
    searchText: string;
    searchSuggestions: string[];
    isUploadVideoDialogOpen: boolean;
    isAppDrawerOpen: boolean;
}

enum HeaderActionType {
    OpenAppDrawer,
    CloseAppDrawer,
    OpenUploadVideoDialog,
    CloseUploadVideoDialog,
    SearchTextChanged,
    SearchSuggestionsChanged,
}

interface HeaderAction {
    type: HeaderActionType;
    payload?: any;
}

const initialState: HeaderState = {
    searchText: '',
    searchSuggestions: [],
    isUploadVideoDialogOpen: false,
    isAppDrawerOpen: false
}

const reducer = (state: HeaderState, action: HeaderAction): HeaderState => {
    switch (action.type) {
        case HeaderActionType.OpenAppDrawer:
            return {
                ...state,
                isAppDrawerOpen: true
            }
        case HeaderActionType.CloseAppDrawer:
            return {
                ...state,
                isAppDrawerOpen: false
            }
        case HeaderActionType.OpenUploadVideoDialog:
            return {
                ...state,
                isUploadVideoDialogOpen: true
            }
        case HeaderActionType.CloseUploadVideoDialog:
            return {
                ...state,
                isUploadVideoDialogOpen: false
            }
        case HeaderActionType.SearchTextChanged:
            return {
                ...state,
                searchText: action.payload
            }
        case HeaderActionType.SearchSuggestionsChanged:
            return {
                ...state,
                searchSuggestions: action.payload
            }
        default:
            return state;
    }
}

const Header = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { searchText, searchSuggestions, isUploadVideoDialogOpen, isAppDrawerOpen } = state;

    const debouncedSearchText = useDebounce(searchText, 500);

    const navigate = useNavigate();

    const { user, logout } = useAuthService();

    const handleClickSearch = useCallback((searchText: string) => {
        const queryParams = new URLSearchParams({ 'search_query': searchText });
        const queryParamsString = queryParams.toString();

        navigate(`/results?${queryParamsString}`);
    }, [navigate]);

    const handleOpenAppDrawer = useCallback(() => {
        dispatch({ type: HeaderActionType.OpenAppDrawer })
    }, []);

    const handleCloseAppDrawer = useCallback(() => {
        dispatch({ type: HeaderActionType.CloseAppDrawer })
    }, []);

    const handleOpenUploadVideoDialog = useCallback(() => {
        dispatch({ type: HeaderActionType.OpenUploadVideoDialog })
    }, []);

    const handleCloseUploadVideoDialog = useCallback(() => {
        dispatch({ type: HeaderActionType.CloseUploadVideoDialog })
    }, []);

    const handleSearchTextChanged = useCallback((searchText: string) => {
        dispatch({ type: HeaderActionType.SearchTextChanged, payload: searchText })
    }, []);

    const handleSearchSuggestionsChanged = useCallback((searchSuggestions: string[]) => {
        dispatch({ type: HeaderActionType.SearchSuggestionsChanged, payload: searchSuggestions })
    }, []);

    useEffect(() => {
        if (debouncedSearchText.length > 0) {
            getVideoSuggestions({ prefix: debouncedSearchText, take: 10}).then(handleSearchSuggestionsChanged);
        } else {
            handleSearchSuggestionsChanged([]);
        }
    }, [debouncedSearchText, handleSearchSuggestionsChanged]);

    return (
        <>
            <AppBar color="default" position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Stack direction="row" spacing={1} padding={1} justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1}>
                        <HamburgerButton onClick={handleOpenAppDrawer} />
                        <Hidden mdDown>
                            <Logo />
                        </Hidden>
                    </Stack>
                    <Box flexGrow={0} flexShrink={1} flexBasis={720}>
                        <SearchField value={searchText} onChange={handleSearchTextChanged} suggestions={searchSuggestions} onSearch={handleClickSearch} />
                    </Box>
                    <Stack direction="row" spacing={1}>
                        {
                            user ?
                                <>
                                    <UploadVideoButton onClick={handleOpenUploadVideoDialog} />
                                    <AccountMenuButton onClickLogout={logout} />
                                </>
                                :
                                <LoginButton />
                        }
                    </Stack>
                </Stack>
            </AppBar>
            <AppDrawer open={isAppDrawerOpen} onClose={handleCloseAppDrawer} />
            <UploadVideoDialog open={isUploadVideoDialogOpen} onClose={handleCloseUploadVideoDialog} />
        </>
    )
}

export default Header;
