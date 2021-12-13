import * as React from 'react';
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

interface SearchFieldProps {
    value: string;
    options: string[];
    onChange: (text: string) => void;
}

function SearchField(props: SearchFieldProps) {
    const { value, options, onChange } = props;
    return (
        <Stack direction="row" alignItems="center">
            <Autocomplete
                renderInput={params => <TextField {...params} size="small" placeholder="Search" />}
                value={value}
                inputValue={value}
                onInputChange={(e, newValue: string | null) => onChange(newValue === null ? '' : newValue)}
                options={options}
                filterOptions={x => x}
                freeSolo
                fullWidth
            />
            <Button variant="contained" style={{height: 40}}>
                <Search/>
            </Button>
        </Stack>
    )
}

export default SearchField;