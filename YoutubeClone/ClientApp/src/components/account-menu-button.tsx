import * as React from 'react';
import { Fragment, useCallback, useState } from "react";
import { Avatar, Menu, MenuItem } from "@mui/material";

interface AccountMenuProps {
    onClickLogout?: () => void;
}

const AccountMenuButton = (props: AccountMenuProps) => {
    const { onClickLogout } = props;
    const [avatarRef, setAvatarRef] = useState(null);

    const handleClick = useCallback((event: any) => {
        setAvatarRef(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAvatarRef(null);
    }, []);

    const open = avatarRef !== null;

    return (
        <Fragment>
            <Avatar onClick={handleClick} />
            <Menu open={open} onClose={handleClose} anchorEl={avatarRef}>
                <MenuItem onClick={onClickLogout}>Logout</MenuItem>
            </Menu>
        </Fragment>
    )
}

export default AccountMenuButton;