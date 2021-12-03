import { Box, Stack } from "@mui/material";
import Feed from "./feed";
import FeedFilterChipBar from "./feed-filter-chip-bar";

const Main = () => (
    <Stack component="main" spacing={2} padding={2}>
        <Feed/>
    </Stack>
);

export default Main;
