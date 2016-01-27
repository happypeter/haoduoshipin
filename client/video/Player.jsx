Player = React.createClass({
  getDefaultProps() {
    return {
      poster: null,
      src: null,
      className: 'video-js vjs-default-skin vjs-big-play-centered',
      controls: true,
      autoplay: false,
      preload: 'auto',
      fluid: true,
      aspectRatio: '16:9',
    };
  },

  componentDidMount() {
    this.checkIfVideoNeedsInstallation();
  },

  componentDidUpdate() {
    this.checkIfVideoNeedsInstallation();
  },

  checkIfVideoNeedsInstallation() {
    if(!this.props.src)
      return;

    if(typeof videojs === 'undefined') {
      $('<link/>', {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://vjs.zencdn.net/4.12/video-js.css'
      }).appendTo('head');

      $.getScript('https://vjs.zencdn.net/4.12/video.js', this.loadVideo);
    } else {
      this.loadVideo();
    }
  },

  loadVideo() {
    if(this.video || !this.props.src) return;

    let node = ReactDOM.findDOMNode(this.refs.videoplayer);
    if(!node) return;

    this.video = document.createElement('video');
    this.video.src = this.props.src;
    this.video.className = this.props.className;

    node.appendChild(this.video);
    videojs(this.video, this.props);
  },

  render() {
    return <div ref="videoplayer" className="container" />;
  }
});
