const { Paper } = mui;

Comment = Radium(React.createClass({
  getGravatar() {
    let md5Hash = Gravatar.hash(this.props.email);
    return url = `http://gravatar.com/avatar/${md5Hash}.png?s=512&d=monsterid`
  },

  getStyles() {
    return {
      paper: {
        padding: '15px 15px 10px 15px',
        marginBottom: '20px'
      },
      avatar: {
        display: 'inline-block',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        '@media (min-width: 700px)': {
          width: '60px',
          height: '60px',
          lineHeight: '60px'
        }
      },
      div: {
        marginLeft: '60px',
        marginTop: '-40px',
        '@media (min-width: 700px)': {
          marginLeft: '80px',
          marginTop: '-70px'
        }
      },
      author: {
        display: 'inline-block',
        lineHeight: '25px',
        fontSize: '16px',
        color: '#666',
      },
      date: {
        display: 'inline-block',
        lineHeight: '25px',
        color: '#666',
        fontSize: '14px',
        paddingLeft: '10px'
      },
      content: {
        display: 'block',
        color: '#727272',
        fontSize: '15px',
        marginTop: '20px',
        '@media (min-width: 700px)': {
          marginLeft: '80px',
          marginTop: '-10px'
        }
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
        <img src={this.getGravatar()} style={ styles.avatar } />
        <div style={ styles.div }>
          <span style={ styles.author }>{ this.props.author }</span>
          <span style={ styles.date }>{ date }</span>
        </div>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} style={ styles.content } className='comment-content' />
      </Paper>
    );
  }
}));
