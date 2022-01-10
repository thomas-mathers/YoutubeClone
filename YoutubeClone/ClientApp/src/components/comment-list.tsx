import { CommentSummary } from "../api/models";
import InfiniteScroller from "./infinite-scroller";
import Comment from "./comment";

interface CommentListProps {
    comments: CommentSummary[];
    fetching: boolean;
    hasNextPage: boolean;
    onFetchNextPage: () => void;
}

const CommentList = (props: CommentListProps) => {
    const { fetching, comments, hasNextPage, onFetchNextPage } = props;
    return (
        <InfiniteScroller fetching={fetching} hasNextPage={hasNextPage} onFetchNextPage={onFetchNextPage}>
            {
                comments.map(c =>
                    <Comment
                        key={c.id}
                        userName={c.userName}
                        userProfilePictureUrl={c.userProfilePictureUrl}
                        text={c.text}
                        likes={c.likes}
                        dislikes={c.dislikes}
                        dateCreated={c.dateCreated}
                    />)
            }
        </InfiniteScroller>
    )
}

export default CommentList;