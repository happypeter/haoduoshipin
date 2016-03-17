const { TextField, RaisedButton } = mui;

CommentForm = Radium(React.createClass({
  getInitialState() {
    return {
      name: '',
      email: '',
      comment: '',
      nameErrorText: '',
      emailErrorText: '',
      commentErrorText: ''
    };
  },

  _onSubmit(event) {
    event.preventDefault();

    let name = this.refs.name.getValue().trim();
    let email = this.refs.email.getValue().trim().toLowerCase();
    let comment = this.refs.comment.getValue();
    let postId = this.props.postId;
    let error = false;

    if(! name) {
      error = true;
      this.setState({nameErrorText: '名字为空'})
    }

    if(! email) {
      error = true;
      this.setState({emailErrorText: '邮箱为空'})
    }

    if( ! comment) {
      error = true;
      this.setState({commentErrorText: '评论为空'})
    }

    if(error) return;

    Meteor.call('/comments/add', name, email, comment, postId, (err) => {
      if (err) {
        alert("添加评论失败！");
        return;
      }
      this.setState({
        name: '',
        email: '',
        comment: ''
      });
    });
  },

  getStyles() {
    return {
      root: {
        '@media (min-width: 40em)': {
          width: '40em'
        }
      },
      h3: {
        marginTop: '30px',
        marginBottom: '-15px',
        fontWeight: '500',
        color: '#00bcd4'
      },
      textField: {
        display: 'block',
        width: '100%',
        height: '80px'
      },
      label: {
        fontWeight: '600',
        fontSize: '15px'
      },
      button: {
        display: 'block',
        width: '100px',
        marginTop: '30px',
        marginBottom: '15px'
      },
      error: {
        textAlign: 'center'
      }
    };
  },

  _handleInputChange(textField) {
    switch(textField){
      case 'name':
        this.setState({name: this.refs.name.getValue()});
        this.setState({nameErrorText: ''});
        break;
      case 'email':
        this.setState({email: this.refs.email.getValue()});
        this.setState({emailErrorText: ''});
        break;
      case 'comment':
        this.setState({comment: this.refs.comment.getValue()});
        this.setState({commentErrorText: ''});
        break;
    }
  },

  render() {
    let styles = this.getStyles();
    let currentUser = this.props.currentUser;
    return (
      <div>
        <h3 style={styles.h3}>留言板</h3>
        <form onSubmit={ this._onSubmit } style={styles.root}>

          <TextField
            ref="name"
            value={currentUser ? currentUser.username : this.state.name}
            style={styles.textField}
            errorText={this.state.nameErrorText}
            errorStyle={ styles.error }
            floatingLabelText="名字 *"
            onChange={this._handleInputChange.bind(this, "name")} />

          <TextField
            ref="email"
            value={currentUser ? currentUser.emails[0].address : this.state.email}
            style={styles.textField}
            errorText={this.state.emailErrorText}
            errorStyle={ styles.error }
            floatingLabelText="邮箱 *"
            onChange={this._handleInputChange.bind(this, "email")} />

          <TextField
            ref="comment"
            value={this.state.comment}
            style={styles.textField}
            errorText={this.state.commentErrorText}
            errorStyle={ styles.error }
            floatingLabelText="评论内容 *"
            multiLine={true}
            onChange={this._handleInputChange.bind(this, "comment")} />

          <RaisedButton
            style={styles.button}
            labelStyle={styles.label}
            type="submit"
            label="提交评论"
            secondary={true} />
        </form>
      </div>
    );
  }
}));
