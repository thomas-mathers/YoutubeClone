import { ThumbDown } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"

interface DislikeButtonProps {
    dislikes: number;
    onClick?: () => void;
}

const DislikeButton = (props: DislikeButtonProps) => {
    const { dislikes, onClick } = props;

    return (
        <Box>
            <IconButton onClick={onClick}>
                <ThumbDown />
            </IconButton>
            <Typography component="span">{dislikes}</Typography>
        </Box>
    )
}

export default DislikeButton;