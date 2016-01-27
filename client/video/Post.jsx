Post = React.createClass({
  getInitialState() {
    return {
      metaData: {},
      post: ''
    };
  },

  componentWillMount() {
    let that = this;
    let postId = this.props.params.id;

    Meteor.call('/video/getPost', postId, function(err, res){
      if (err) {
        console.log(`The post does not exist!`);
        return;
      }
      that.setState({
        metaData: res.metaData,
        post: res.postContent
      });
    });
  },

  render() {
    marked.setOptions({
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    });
    let html = marked(this.state.post, {sanitize: true});
    let postId = parseInt(this.props.params.id);
    let videoSource = `http://7xnm4l.com1.z0.glb.clouddn.com/${this.state.metaData.name}.mp4`
    return (
      <div className="post-page">
        <PostHero metaData={this.state.metaData} />
        { this.state.metaData.name ? <Player src={videoSource} /> : '' }
        <span className="post-content container" dangerouslySetInnerHTML={{__html: html}} />
      </div>
    );
  }
});
