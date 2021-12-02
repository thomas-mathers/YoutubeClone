import { AppBar, Box, Stack } from '@mui/material';
import SearchField from './searchField';
import LoginButton from './loginButton';
import HamburgerButton from './hamburgerButton';
import Logo from './logo';

const Header = () => (
    <AppBar color="default" position="static">
        <Stack direction="row" spacing={1} padding={1} alignItems="center">
            <HamburgerButton />
            <Box sx={{ display: { xs: 'none', sm: 'block' }}}>
                <Logo />
            </Box>
            <Box flex={1}>
                <SearchField />
            </Box>
            <LoginButton />
        </Stack>
    </AppBar>
);

export default Header;
