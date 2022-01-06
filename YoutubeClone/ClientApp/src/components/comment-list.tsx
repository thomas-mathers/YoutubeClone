import { CommentSummary } from "../api/models";
import InfiniteScroller from "./infinite-scroller";
import Comment from "./comment";

interface CommentListProps {
    comments: CommentSummary[];
    fetching: boolean;
    onFetchNextPage: () => void;
}

const CommentList = (props: CommentListProps) => {
    const { fetching, comments, onFetchNextPage } = props;
    return (
        <InfiniteScroller fetching={fetching} onFetchNextPage={onFetchNextPage}>
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