const { IconButton } = mui;

Hamburger = React.createClass({
  render() {
    let color = _.isEmpty(this.props.iconColor) ? '#fff' : this.props.iconColor;

    let styles = {
      iconButton: {
        width: '52px',
        height: '52px',
        zIndex: '2',
        position: 'absolute',
        top: '8px',
        left: '8px',
      },
      svg: {
        fill: color,
        width: '32px',
        height: '32px',
      }
    };

    return (
      <section>
        <IconButton
          style={styles.iconButton}
          iconStyle={styles.svg}
          onTouchTap={this._onLeftIconButtonTouchTap}>
          <NavigationMenu />
        </IconButton>
        <AppLeftNav ref="leftNav" />
      </section>
    );
  },

  _onLeftIconButtonTouchTap() {
    this.refs.leftNav.handleToggle();
  }
});
