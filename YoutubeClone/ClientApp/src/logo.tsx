import { Stack, Typography } from "@mui/material";

const Logo = () => (
    <Stack direction="row" spacing={1} alignItems="center" paddingLeft={1} paddingRight={1}>
        <img src="logo512.png" height={40} />
        <Typography>YoutubeClone</Typography>
    </Stack>
);

export default Logo;
