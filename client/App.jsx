const { IconButton } = mui;

App = React.createClass({
  render() {
    return (
      <div>
        { this.props.children }
        <Footer />
      </div>
    );
  }
});
