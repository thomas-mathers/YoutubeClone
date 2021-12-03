import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

interface HamburgerButtonProps {
    onClick: () => void;
}

function HamburgerButton({onClick}: HamburgerButtonProps) {
    return (
        <IconButton onClick={onClick}>
            <MenuIcon/>
        </IconButton>
    )
}

export default HamburgerButton;