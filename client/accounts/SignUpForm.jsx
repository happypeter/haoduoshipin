const {
  TextField,
  RaisedButton,
  FlatButton
} = mui;
const Link = Radium(ReactRouter.Link);

SignUpForm = Radium(React.createClass({
  getInitialState() {
    return {
      userName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  _onSubmit(event) {
    event.preventDefault();

    let userName = this.refs.userName.getValue();
    let email = this.refs.email.getValue();
    let password = this.refs.password.getValue();
    let confirmPassword = this.refs.confirmPassword.getValue();

    let error = false;
    let reUser = /^\w+$/;
    let reEmail = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;

    if (!userName || !reUser.test(userName)) {
      error = true;
      this.setState({userName: "用户名为空或格式不正确"});
    }

    if (!email || !reEmail.test(email)) {
      error = true;
      this.setState({email: "邮箱为空或格式不正确"});
    }

    if (!password || (password.length < 6)) {
      error = true;
      this.setState({password: "密码为空或长度少于6个字符"});
    }

    if (confirmPassword !== password) {
      error = true;
      this.setState({confirmPassword: "密码不匹配"});
    }

    if(error) return;

    Accounts.createUser({
      username: userName,
      email: email,
      password: password
    }, (error) => {
      if (error) {
        if (error.reason.indexOf("Username") !== -1)
          this.setState({userName: "用户名已被注册"});

        if (error.reason.indexOf("Email") !== -1)
          this.setState({email: "邮箱已被注册"});
        return;
      }

      this.context.router.push(this.props.transitionTo);
      sAlert.success('恭喜您，注册成功了！', {effect: 'slide'});
    });
  },

  _handleFloatingErrorInputChange(textField) {
    switch(textField){
      case 'userName':
        this.setState({userName: ''});
        break;
      case 'email':
        this.setState({email: ''});
        break;
      case 'password':
        this.setState({password: ''});
        break;
      case 'confirmPassword':
        this.setState({confirmPassword: ''});
        break;
    }
  },

  render() {
    let styles = {
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
        height: '50px',
        width: '260px',
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
          <TextField
            ref="userName"
            style={styles.textField}
            hintText="只允许数字、大小写字母和下划线"
            errorText={this.state.userName}
            floatingLabelText="用户名"
            floatingLabelStyle={styles.floatingLabel}
            onChange={this._handleFloatingErrorInputChange.bind(this, "userName")} />

          <TextField
            ref="email"
            style={styles.textField}
            hintText="example@gmail.com"
            errorText={this.state.email}
            floatingLabelText="邮箱"
            floatingLabelStyle={styles.floatingLabel}
            onChange={this._handleFloatingErrorInputChange.bind(this, "email")} />

          <TextField
            ref="password"
            style={styles.textField}
            hintText="密码长度不能少于6个字符"
            errorText={this.state.password}
            floatingLabelText="密码"
            floatingLabelStyle={styles.floatingLabel}
            onChange={this._handleFloatingErrorInputChange.bind(this, "password")}
            type="password" />

          <TextField
            ref="confirmPassword"
            style={styles.textField}
            errorText={this.state.confirmPassword}
            floatingLabelText="确认密码"
            floatingLabelStyle={styles.floatingLabel}
            onChange={this._handleFloatingErrorInputChange.bind(this, "confirmPassword")}
            type="password" />

          <RaisedButton
            style={styles.button}
            labelStyle={styles.label}
            type="submit"
            label="注册"
            primary={true} />
        </form>
        <Link to="/login" style={styles.a}>已有账号？请登录</Link>
      </div>
    );
  }
}));
