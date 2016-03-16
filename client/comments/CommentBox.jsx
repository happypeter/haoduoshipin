CommentBox = React.createClass({
  propTypes: {
    comments: React.PropTypes.array.isRequired,
    postId: React.PropTypes.number.isRequired
  },

  render() {
    let styles = {
      h3: {
        fontWeight: '500',
        color: '#00bcd4'
      }
    };

    return (
      <div className="container">
        <h3 style={styles.h3}>发表评论 { this.props.comments.length }</h3>
        <CommentList comments={ this.props.comments } />
        <CommentForm postId={ this.props.postId } currentUser={this.props.currentUser} />
      </div>
    );
  }
});
