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
    return this.context.router.isActive('/home') ? '/home' :
      this.context.router.isActive('/video') ? '/video' :
      this.context.router.isActive('/about') ? '/about' : '';
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
        paddingLeft: '24px',
        paddingTop: '0px',
        marginBottom: '8px',
      },
      selectedList: {
        color: '#ff4081',
        backgroundColor: 'rgba(0, 0, 0, 0.03)',
      }
    };

    return (
      <LeftNav open={this.state.open}
               docked={false}
               onRequestChange={open => this.setState({open})}>
        <div style={styles.header}
          onTouchTap={this.handleTouchTapHeader}>
          好多视频网
        </div>
        <SelectableList
          selectedItemStyle={styles.selectedList}
          valueLink={{
            value: this.state.selectedIndex,
            requestChange: this.handleUpdateSelectedIndex, }}>
          <ListItem
            value="/home"
            primaryText="首页" />
          <ListItem
            value='/video'
            primaryText='视频' />
          <ListItem
            value='/about'
            primaryText='关于' />
        </SelectableList>
      </LeftNav>
    );
  },

  handleToggle() {
    this.setState({open: !this.state.open});
  },

  handleUpdateSelectedIndex(e, index) {
    this.context.router.push(index);
    this.setState({
      open: false,
      selectedIndex: index,
    });
  },

  handleTouchTapHeader() {
    this.context.router.push('/home');
    this.setState({open: false});
  }
});
