const { AppBar } = mui;

App = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentWillMount() {
    let setTabsState = function() {
      this.setState({renderTabs: !(document.body.clientWidth <= 647)});
    }.bind(this);
    setTabsState();
    window.onresize = setTabsState;
  },

  render() {
    return (
      <div>
        { this.state.renderTabs ? (<NavBarTabs />) : this._getAppBar() }

        <AppLeftNav ref="leftNav" />

        {this.props.children}

      </div>
    );
  },

  _getAppBar() {
    let title = this.context.router.isActive('/home') ? '首页' :
      this.context.router.isActive('/video') ? '视频' :
      this.context.router.isActive('/about') ? '关于' : '';

    return (
      <div>
        <AppBar
          onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
          title={title}
          zDepth={1} />
      </div>
    );
  },

  _onLeftIconButtonTouchTap() {
    this.refs.leftNav.handleToggle();
  }
});
