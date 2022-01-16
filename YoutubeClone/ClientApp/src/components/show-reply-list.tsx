import { ArrowDropDown } from "@mui/icons-material"
import { Icon, Link, Stack, Typography } from "@mui/material"

interface ShowReplyListProps {
    replies: number;
    onClick: () => void;
}

const ShowReplyList = (props: ShowReplyListProps) => {
    const { replies, onClick } = props;
    return (
        <Link component="button" onClick={onClick}>
            <Stack direction="row" spacing={1}>
                <Icon>
                    <ArrowDropDown />
                </Icon>
                <Typography variant="body1">Show {replies} replies</Typography>
            </Stack>
        </Link>
    )
}

export { ShowReplyList }