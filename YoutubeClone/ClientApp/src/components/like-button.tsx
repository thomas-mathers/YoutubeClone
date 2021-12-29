import { ThumbUp } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"

interface LikeButtonProps {
    likes: number;
    onClick?: () => void;
}

const LikeButton = (props: LikeButtonProps) => {
    const { likes, onClick } = props;

    return (
        <Box>
            <IconButton onClick={onClick}>
                <ThumbUp />
            </IconButton>
            <Typography component="span">{likes}</Typography>
        </Box>
    )
}

export default LikeButton;