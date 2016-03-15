const { Paper, Avatar } = mui;

Comment = React.createClass({
  getGravatar() {
    let md5Hash = Gravatar.hash(this.props.email);
    return url = `http://gravatar.com/avatar/${md5Hash}.png?s=512&d=monsterid`
  },

  getStyles() {
    return {
      paper: {
        padding: '20px',
        marginBottom: '20px'
      },
      avatar: {
        width: '60px',
        height: '60px',
        lineHeight: '60px'
      },
      div: {
        marginLeft: '80px',
        marginTop: '-70px'
      },
      strong: {
        fontSize: '18px',
        lineHeight: '25px'
      },
      date: {
        fontSize: '11px',
        color: '#727272',
        marginBottom: '10px'
      }
    };
  },

  render() {
    let styles = this.getStyles();
    let date = moment(this.props.createdAt).fromNow();
    let avatar = this.props.author.charAt(0).toUpperCase();
    let rawMarkup = marked(this.props.content, {sanitize: true});

    return (
      <Paper zDepth={1} style={ styles.paper }>
        <Avatar src={this.getGravatar()} style={ styles.avatar } />
        <div style={ styles.div }>
          <div>
            <span style={ styles.strong }>
              { this.props.author }
            </span>
            <span> 说：</span>
          </div>
          <div style={ styles.date }>{ date }</div>
          <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
        </div>
      </Paper>
    );
  }
});
