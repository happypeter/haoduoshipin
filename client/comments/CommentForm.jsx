const { TextField, RaisedButton } = mui;

CommentForm = React.createClass({
  getInitialState() {
    return {
      name: '',
      email: '',
      comment: ''
    };
  },

  _onSubmit(event) {
    event.preventDefault();

    let name = this.refs.name.getValue().trim();
    let email = this.refs.email.getValue().trim().toLowerCase();
    let website = this.refs.website.getValue();
    let comment = this.refs.comment.getValue();
    let postId = this.props.postId;
    let error = false;

    if(! name) {
      error = true;
      this.setState({name: '名字为空'})
    }

    if(! email) {
      error = true;
      this.setState({email: '邮箱为空'})
    }

    if( ! comment) {
      error = true;
      this.setState({comment: '评论为空'})
    }

    if(error) return;

    Meteor.call('/comments/add', name, email, website, comment, postId, (err) => {
      if (err) {
        alert("添加评论失败！");
        return;
      }
      this.refs.name.clearValue();
      this.refs.email.clearValue();
      this.refs.website.clearValue();
      this.refs.comment.clearValue();
    });
  },

  getStyles() {
    return {
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

  _handleFloatingErrorInputChange(textField) {
    switch(textField){
      case 'name':
        this.setState({name: ''});
        break;
      case 'email':
        this.setState({email: ''});
        break;
      case 'comment':
        this.setState({comment: ''});
        break;
    }
  },

  render() {
    let styles = this.getStyles();

    return (
      <div>
        <h3 style={styles.h3}>留言板</h3>
        <form onSubmit={ this._onSubmit }>

          <TextField
            ref="name"
            style={styles.textField}
            errorText={this.state.name}
            errorStyle={ styles.error }
            floatingLabelText="名字*"
            onChange={this._handleFloatingErrorInputChange.bind(this, "name")} />

          <TextField
            ref="email"
            style={styles.textField}
            errorText={this.state.email}
            errorStyle={ styles.error }
            floatingLabelText="邮箱*"
            onChange={this._handleFloatingErrorInputChange.bind(this, "email")} />

          <TextField
            ref="website"
            style={styles.textField}
            floatingLabelText="网站" />

          <TextField
            ref="comment"
            style={styles.textField}
            errorText={this.state.comment}
            errorStyle={ styles.error }
            floatingLabelText="评论内容*"
            multiLine={true}
            onChange={this._handleFloatingErrorInputChange.bind(this, "comment")} />

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
});
