const { LeftNav, List, ListItem } = mui;

const SelectableList = selectableEnhance.SelectableContainerEnhance(List);

AppLeftNav = React.createClass({
  getInitialState() {
    return {
      open: false,
      selectedIndex: ''
    };
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount() {
    this.setState({
      selectedIndex: this._getSelectedIndex()
    })
  },

  componentWillReceiveProps() {
    this.setState({
      selectedIndex: this._getSelectedIndex()
    })
  },

  _getSelectedIndex() {
    return this.context.router.isActive('/all') ? '/all' :
      this.context.router.isActive('/signup') ? '/signup' :
      this.context.router.isActive('/login') ? '/login' :
      this.context.router.isActive('/about') ? '/about' : '';
  },

  getGravatar(email) {
    let md5Hash = Gravatar.hash(email);
    return url = `http://gravatar.com/avatar/${md5Hash}.png?s=512&d=monsterid`
  },

  render() {
    let styles = {
      header: {
        cursor: 'pointer',
        fontSize: '24px',
        color: '#fff',
        lineHeight: '64px',
        fontWeight: '300',
        backgroundColor: '#00bcd4',
        marginBottom: '8px',
        textAlign: 'center',
      },
      avatar: {
        borderBottom: '1px solid #e0e0e0',
        textAlign: 'center'
      },
      name: {
        color: '#696969',
        fontSize: '20px',
        margin: '10px 0'
      },
      img: {
        display: 'block',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        margin: '0 auto'
      },
      selectedList: {
        color: '#ff4081',
        backgroundColor: 'rgba(0, 0, 0, 0.03)',
      },
      list: {
        textAlign: 'center',
        fontSize: '18px',
      }
    };
    let currentUser = this.props.currentUser;
    let avatar;
    if(!_.isEmpty(currentUser)) {
      avatar = (
        <div style={styles.avatar}>
          <img src={this.getGravatar(currentUser.emails[0].address)} style={styles.img} />
          <div style={styles.name}>{currentUser.username}</div>
        </div>
      );
    }
    return (
      <LeftNav open={this.state.open}
         docked={false}
         onRequestChange={open => this.setState({open})}>
        <div style={styles.header} onTouchTap={this.handleTouchTapHeader}>
          好多视频网
        </div>
        { avatar }
        <SelectableList
          selectedItemStyle={styles.selectedList}
          valueLink={{
            value: this.state.selectedIndex,
            requestChange: this.handleUpdateSelectedIndex, }}>
          <ListItem
            style={styles.list}
            value='/all'
            primaryText='视频列表' />
          <ListItem
            style={styles.list}
            value='/about'
            primaryText='关于' />
          { currentUser ? '' : <ListItem style={styles.list} value='/signup' primaryText='注册' />}
          <ListItem
            style={styles.list}
            value={ currentUser ? '退出' : '/login' }
            primaryText={ currentUser ? '退出' : '登录' } />
        </SelectableList>
      </LeftNav>
    );
  },

  handleToggle() {
    this.setState({open: !this.state.open});
  },

  handleUpdateSelectedIndex(e, index) {
    if(index === '退出') {
      Meteor.logout();
      this.context.router.push('/home');
      sAlert.success('已经退出登录！', {effect: 'slide'});
    } else {
      this.context.router.push(index);
    }
    this.setState({
      open: false,
      selectedIndex: index,
    });
  },

  handleTouchTapHeader() {
    this.context.router.push('/');
    this.setState({open: false});
  }
});
