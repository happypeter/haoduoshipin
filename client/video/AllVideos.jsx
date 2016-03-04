const { CircularProgress } = mui;
AllVideos = React.createClass({
  getInitialState(){
    return {
      posts: [],
      inputText: ''
    };
  },
  componentWillMount() {
    let that = this;

    Meteor.call('/video/getPost', "posts", function(err, res){
      if (err) {
        console.log(`This file does not exist!`);
        return;
      }
      that.setState({ posts: JSON.parse(res) });
    });
  },

  componentDidMount() {
    $(".loader").delay(1000).fadeOut('slow', function() {
      $(".video-list").fadeIn('slow');
    });
  },

  render() {
    let styles = {
      hero: {
        backgroundColor: '#00bcd4',
        textAlign: 'center',
        paddingTop: '120px',
        paddingBottom: '55px',
      },
      title: {
        fontSize: '48px',
        color: '#fff',
        marginBottom: '20px',
        lineHeight: 1.1
      },
      circle: {
        margin: '0 auto',
        paddingTop: '100px',
        display: 'block'
      }
    };

    return (
      <div>
        <Hamburger />
        <div style={styles.hero}>
          <div style={styles.title}>ALL</div>
          <SearchBar
            inputText={this.state.inputText}
            onUserInput={this._handleInputChange} />
        </div>
        <CircularProgress
          mode="indeterminate"
          className="loader"
          style={styles.circle} />
        <div style={{minHeight: '20em'}}>
          <VideoList
            inputText={this.state.inputText}
            posts={this.state.posts.reverse()}
            className="video-list container" />
        </div>
      </div>
    );
  },

  _handleInputChange(text) {
    this.setState({inputText: text})
  }
});
