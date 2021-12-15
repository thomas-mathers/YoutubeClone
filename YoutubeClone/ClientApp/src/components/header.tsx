import * as React from 'react';
import { ReactNode } from 'react';
import { AppBar, Box, Stack } from '@mui/material';

interface HeaderProps {
    left?: ReactNode;
    middle?: ReactNode;
    right?: ReactNode;
}

const Header = (props: HeaderProps) => {
    const { left, middle, right } = props;

    return (
        <AppBar color="default" position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Stack direction="row" spacing={1} padding={1} justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={1}>
                    {left}
                </Stack>
                <Box flexGrow={0} flexShrink={1} flexBasis={720}>
                    {middle}                    
                </Box>
                <Stack direction="row" spacing={1}>
                    {right}
                </Stack>
            </Stack>
        </AppBar>
    )
}

export default Header;
