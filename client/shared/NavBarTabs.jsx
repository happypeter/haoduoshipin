const { Tabs, Tab, IconButton } = mui;

NavBarTabs = React.createClass({
  getInitialState() {
    return {
      tabIndex: ''
    };
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentWillMount() {
    this.setState({
      tabIndex: this._getSelectedIndex(),
    });
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      tabIndex: this._getSelectedIndex(),
    });
  },

  _handleTabsChange(value) {
    this.context.router.push(value);
    this.setState({tabsIndex: this._getSelectedIndex()});
  },

  _getSelectedIndex() {
    return this.context.router.isActive('/home') ? '/home' :
      this.context.router.isActive('/video') ? '/video' :
      this.context.router.isActive('/about') ? '/about' : '';
  },

  render() {
    let styles = {
      tabs: {
        width: '390px',
        position: 'absolute',
        right: '60px'
      },
      tab: {
        height: '64px',
        color: '#727272',
        fontSize: '16px',
      },
      inkBar: {
        height: '4px',
        marginTop: '-4px',
      },
    };

    return (
      <div className="app-header">
        <Tabs
          style={styles.tabs}
          tabItemContainerStyle={{backgroundColor: '#fff'}}
          inkBarStyle={styles.inkBar}
          value={this.state.tabIndex}
          onChange={this._handleTabsChange}>
          <Tab
            label='首页'
            value='/home'
            style={styles.tab} />
          <Tab
            label='视频'
            value='/video'
            style={styles.tab} />
          <Tab
            label='关于'
            value='/about'
            style={styles.tab} />
        </Tabs>
      </div>
    );
  }
});
