import { useCallback, useState } from "react";
import { Link, Stack } from "@mui/material";
import { CommentSummary } from "../api/models"
import LoadMoreScroller from "./load-more-scroller"
import Comment from "./comment";

interface ReplyListProps {
    totalReplies: number;
    replies: CommentSummary[];
    fetching: boolean;
    hasNextPage: boolean;
    onFetchNextPage: () => void;
}

const ReplyList = (props: ReplyListProps) => {
    const { totalReplies, replies, fetching, hasNextPage, onFetchNextPage } = props;
    const [open, setOpen] = useState(false);

    const handleClickShowReplies = useCallback(() => setOpen(true), []);
    const handleClickHideReplies = useCallback(() => setOpen(false), []);

    return (
        <Stack>
            {
                open ?
                    <Link onClick={handleClickHideReplies}>Hide {totalReplies} replies</Link>
                    :
                    <Link onClick={handleClickShowReplies}>View {totalReplies} replies</Link>
            }            
            {
                open &&
                <LoadMoreScroller fetching={fetching} hasNextPage={hasNextPage} onFetchNextPage={onFetchNextPage}>
                    {
                        replies.map(c =>
                            <Comment
                                id={c.id}
                                key={c.id}
                                userName={c.userName}
                                userProfilePictureUrl={c.userProfilePictureUrl}
                                text={c.text}
                                likes={c.likes}
                                dislikes={c.dislikes}
                                dateCreated={c.dateCreated}
                            />)
                    }
                </LoadMoreScroller>
            }
        </Stack>
    )
}

export { ReplyList }