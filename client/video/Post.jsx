const { CircularProgress } = mui;
Post = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState() {
    return {
      metaData: {},
      post: '',
      validFile: true
    };
  },
  getMeteorData() {
    const postId = parseInt(this.props.params.id);
    // subscribe to the comments
    const commentsSubHandle = Meteor.subscribe("comments", postId);

    return {
      currentUser: Meteor.user(),
      comments: Comments.find({}, {sort: {createdAt: 1}}).fetch(),
      // TODO: check if the code below is needed
      ready: !commentsSubHandle.ready()
    }
  },

  componentWillMount() {
    let that = this;
    let postId = this.props.params.id;

    Meteor.call('/video/getPost', postId, function(err, res){
      if (err) {
        that.setState({validFile: false});
        return;
      }
      that.setState({
        metaData: res.metaData,
        post: res.postContent
      });
    });
  },

  componentDidMount() {
    $(".loader").delay(1000).fadeOut('slow', function() {
      $(".video-post").fadeIn('slow');
    });
  },

  componentDidUpdate() {
    document.title = this.state.metaData.title;
  },

  render() {
    marked.setOptions({
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    });
    let html = marked(this.state.post);
    let postId = parseInt(this.props.params.id);
    let videoSource = `http://7xnm4l.com1.z0.glb.clouddn.com/${this.state.metaData.name}.mp4`
    let styles = {
      circle: {
        margin: '0 auto',
        paddingTop: '100px',
        display: 'block'
      }
    };
    if (!this.state.validFile) return <PageNotFound />;
    return (
      <div className="post-page">
        <Hamburger />
        <PostHero metaData={this.state.metaData} />
        <CircularProgress
          mode="indeterminate"
          className="loader"
          style={styles.circle} />
        <div style={{minHeight: '20em'}}>
          <div className="video-post">
            { this.state.metaData.name ? <Player src={videoSource} /> : '' }
            <div className="post-content container" dangerouslySetInnerHTML={{__html: html}} />
          </div>
        </div>
        <CommentBox comments={this.data.comments} postId={parseInt(this.props.params.id)} currentUser={this.data.currentUser} />
      </div>
    );
  }
});
