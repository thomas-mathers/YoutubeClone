import * as React from 'react';
import { Close, Search } from "@mui/icons-material";
import { Button, FilledInput, IconButton, InputAdornment, Stack } from "@mui/material";

function SearchField() {
    return (
        <Stack direction="row" alignItems="center">
            <FilledInput
                size="small"
                fullWidth
                hiddenLabel
                disableUnderline
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton size="small" edge="end">
                            <Close />
                        </IconButton>
                    </InputAdornment>
                }
                placeholder="Search"
            />
            <Button variant="contained" style={{height: 40}}>
                <Search/>
            </Button>
        </Stack>
    )
}

export default SearchField;