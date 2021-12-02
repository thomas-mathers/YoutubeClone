import { Button } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

function LoginButton() {
    return (
        <Button variant="contained" startIcon={<AccountCircle />} style={{ height: 40 }}>Login</Button>
    )
}

export default LoginButton;