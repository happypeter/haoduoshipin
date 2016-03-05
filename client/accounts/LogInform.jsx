const {
  TextField,
  RaisedButton,
  FlatButton,
} = mui;
const Link = Radium(ReactRouter.Link);

LogInform = Radium(React.createClass({
  getInitialState() {
    return {
      errors: {}
    };
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  _onSubmit(event) {
    event.preventDefault();

    let userName = this.refs.userName.getValue();
    let password = this.refs.password.getValue();

    let errors = {};
    let reUser = /^\w+$/;

    if (!userName || !reUser.test(userName)) {
      errors.userName = "亲，你的用户名格式错误哦 :(";
    }
    else if (!password || (password.length < 6)) {
      errors.password = '亲，您的密码太短了 :(';
    }

    this.setState({
      errors: errors
    });

    if (! _.isEmpty(errors)) {
      return;
    }

    Meteor.loginWithPassword({username: userName}, password, (error) => {
      if (error) {
        console.log(error.reason);
        if (error.reason.indexOf("User") !== -1)
          this.setState({errors: { 'server': "亲，您的用户名不存在哦 :(" }});

        if (error.reason.indexOf("password") !== -1)
          this.setState({errors: { 'server': "亲，您的密码无效 :(" }});

        return;
      }
      this.context.router.push(this.props.transitionTo);
      sAlert.success('恭喜您，登录成功了！', {effect: 'slide'});
    });
  },

  render() {
    let styles =  {
      root: {
        minHeight: '400px',
        textAlign: 'center',
        padding: '6em 2em',
        '@media (min-width: 500px)': {
          width: '500px',
          margin: '0 auto'
        }
      },
      form: {
        margin: '30px auto 0'
      },
      textField: {
        display: 'block',
        width: '100%'
      },
      floatingLabel: {
        fontSize: '1.2rem'
      },
      label: {
        fontWeight: '600',
        fontSize: '1.2rem'
      },
      button: {
        width: '260px',
        height: '50px',
        marginTop: '50px',
        marginBottom: '15px'
      },
      a: {
        textDecoration: 'none',
        color: 'gray',
        ':hover': {color: '#00bcd4'}
      }
    };

    return (
      <div style={styles.root}>
        <form onSubmit={ this._onSubmit } style={styles.form}>
          <AuthErrors errors={this.state.errors} />

          <TextField
            ref="userName"
            style={styles.textField}
            floatingLabelText="用户名"
            floatingLabelStyle={styles.floatingLabel}
            onChange={this._handleFloatingErrorInputChange} />

          <TextField
            ref="password"
            style={styles.textField}
            floatingLabelText="密码"
            floatingLabelStyle={styles.floatingLabel}
            type="password"
            onChange={this._handleFloatingErrorInputChange} />

          <RaisedButton
            style={styles.button}
            labelStyle={styles.label}
            type="submit"
            label="登录"
            primary={true} />
        </form>

        <Link to="/signup" style={styles.a}>没有账号？注册一个吧</Link>
      </div>
    );
  },

  _handleFloatingErrorInputChange() {
    this.setState({errors: {}});
  }
}));
