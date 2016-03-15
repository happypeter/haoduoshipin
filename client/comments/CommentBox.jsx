CommentBox = Radium(React.createClass({
  propTypes: {
    comments: React.PropTypes.array.isRequired,
    postId: React.PropTypes.number.isRequired
  },

  render() {
    let styles = {
      root: {
        width: '100%',
        margin: '0 auto',
        padding: '2em',
        borderTop: '1px solid #eee',
        '@media (min-width: 45em)': {
          width: '45em',
          margin: '0 auto'
        }
      },
      h3: {
        fontWeight: '500',
        color: '#00bcd4'
      }
    };

    return (
      <div style={styles.root}>
        <h3 style={styles.h3}>发表评论 { this.props.comments.length }</h3>
        <CommentList comments={ this.props.comments } />
        <CommentForm postId={ this.props.postId } />
      </div>
    );
  }
}));
