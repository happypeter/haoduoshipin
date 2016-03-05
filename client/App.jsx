const { IconButton } = mui;
const StyleRoot = Radium.StyleRoot;
App = Radium(React.createClass({
  render() {
    return (
      <StyleRoot>
        { this.props.children }
        <Footer />
      </StyleRoot>
    );
  }
}));
