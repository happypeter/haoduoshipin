CommentList = React.createClass({
  render() {
    const allComments = this.props.comments.map((comment, key) => {
      return (
        <Comment author={comment.commenter}
          createdAt={comment.createdAt}
          content={comment.content}
          email={comment.email}
          key={key} />
      );
    });

    return (
      <div>
        { allComments }
      </div>
    );
  }
});
