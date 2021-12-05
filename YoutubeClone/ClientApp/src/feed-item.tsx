import * as React from 'react';
import { Avatar, Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from "@mui/material";

const FeedItem = () => (
    <Card>
        <CardActionArea>
            <CardMedia component="img" height="250" src="https://i.ytimg.com/an_webp/CEZ6cF8eoeg/mqdefault_6s.webp?du=3000&sqp=CMCppI0G&rs=AOn4CLDHqNOoF1kCWDAfZ_gCcHy0MwhoCQ" />
        </CardActionArea>
        <CardContent>
            <Stack direction="row" spacing={2}>
                <Avatar src="https://yt3.ggpht.com/ytc/AKedOLQcru_UEZ-DP0EX0wDMD3TR-r59xvVvphPHrvVv_A=s68-c-k-c0x00ffffff-no-rj"/>
                <Stack>
                    <Typography variant="subtitle1" component="div">How to write "smarter" enums in C#</Typography>
                    <Typography variant="caption" component="div">Nick Chapsas</Typography>
                    <Typography variant="caption" component="span">11K views</Typography>
                    <Typography variant="caption" component="span">8 hours ago</Typography>
                </Stack>
            </Stack>
        </CardContent>
    </Card>
)

export default FeedItem;
