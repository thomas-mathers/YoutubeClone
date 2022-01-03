import * as React from 'react';
import { useMemo } from 'react';
import { Autocomplete, AutocompleteInputChangeReason, Button, Stack, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useCallback } from 'react';

interface SearchFieldProps {
    value: string;
    suggestions: string[];
    onChange: (text: string) => void;
    onSearch?: (text: string) => void;
}

function SearchField(props: SearchFieldProps) {
    const { value, suggestions, onChange, onSearch } = props;

    const options = useMemo(() => suggestions.map((x, i) => ({ id: i, label: x })), [suggestions]);

    const onClickSearch = useCallback(() => onSearch?.(value), [onSearch, value]);

    const onInputChange = useCallback((e, value: string | null, reason: AutocompleteInputChangeReason) => {
        const newValue = value === null ? '' : value;

        onChange(newValue);

        if (reason === 'clear' || reason === 'reset') {
            onSearch?.(newValue);
        }
    }, [onChange, onSearch]);

    return (
        <Stack direction="row" alignItems="center">
            <Autocomplete
                renderOption={(props, option) => {
                    return (
                        <li {...props} key={option.id}>
                            {option.label}
                        </li>
                    );
                }}
                renderInput={params => <TextField {...params} size="small" placeholder="Search" />}
                value={value}
                inputValue={value}
                onInputChange={onInputChange}
                options={options}
                filterOptions={x => x}
                freeSolo
                fullWidth
            />
            <Button variant="contained" style={{ height: 40 }} onClick={onClickSearch}>
                <Search/>
            </Button>
        </Stack>
    )
}

export default SearchField;