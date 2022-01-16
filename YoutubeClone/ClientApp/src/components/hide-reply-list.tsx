import { ArrowDropUp } from "@mui/icons-material"
import { Icon, Link, Stack, Typography } from "@mui/material"

interface HideReplyListProps {
    replies: number;
    onClick: () => void;
}

const HideReplyList = (props: HideReplyListProps) => {
    const { replies, onClick } = props;
    return (
        <Link component="button" onClick={onClick}>
            <Stack direction="row" spacing={1}>
                <Icon>
                    <ArrowDropUp />
                </Icon>
                <Typography variant="body1">Hide {replies} replies</Typography>
            </Stack>
        </Link>
    )
}

export { HideReplyList }