import { Avatar, Menu, MenuItem } from "@mui/material";
import * as React from 'react';
import { Fragment, useState } from "react";
import { useUser } from "../hooks/use-user";

const AccountMenu = () => {
    const [avatarRef, setAvatarRef] = useState(null);
    const { handleLogout } = useUser();

    const handleClick = (event: any) => {
        setAvatarRef(event.currentTarget);
    }

    const handleClose = () => {
        setAvatarRef(null);
    }

    const handleClickLogout = () => {
        handleLogout();
    }

    const open = avatarRef !== null;

    return (
        <Fragment>
            <Avatar onClick={handleClick} />
            <Menu open={open} onClose={handleClose} anchorEl={avatarRef}>
                <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
            </Menu>
        </Fragment>
    )
}

export default AccountMenu;