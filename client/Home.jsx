const { RaisedButton } = mui;

Home = React.createClass({
  render() {
    return (
      <div className="home">
        <div className="overlay">
          <div className="content">
            <h1 className="title">
              <span>欢迎来到</span>
              <span className="name">好多视频网</span>
            </h1>
          </div>
        </div>
      </div>
    );
  }
});
