import CommentItem from "./CommentItem";

const CommentsList = (props) => {
  return props.commentsList.map((comment) => (
    <div className="column is-12">
      <CommentItem
        key={comment.id}
        id={comment.id}
        text={comment.text}
        user={comment.user}
        timestamp={comment.timestamp}
      />
    </div>
  ));
};

export default CommentsList;
