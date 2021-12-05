import * as React from 'react';
import { Avatar, Menu, MenuItem } from "@mui/material";
import { Fragment, useState } from "react";

const AccountMenu = () => {
    const [avatarRef, setAvatarRef] = useState(null);

    const handleClick = (event: any) => {
        setAvatarRef(event.currentTarget);
    }

    const handleClose = () => {
        setAvatarRef(null);
    }

    const open = avatarRef !== null;

    return (
        <Fragment>
            <Avatar onClick={handleClick} />
            <Menu open={open} onClose={handleClose} anchorEl={avatarRef}>
                <MenuItem>Logout</MenuItem>
            </Menu>
        </Fragment>
    )
}

export default AccountMenu;