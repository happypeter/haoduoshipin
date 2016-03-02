Footer = React.createClass({
  render() {
    let styles = {
      root: {
        padding: '30px 0',
        textAlign: 'center',
        backgroundColor: '#212121',
        color: '#fff',
      },
      img: {
        display: 'block',
        width: '100%',
        maxWidth: '230px',
        margin: '20px auto',
      }
    };
    return (
      <div style={styles.root}>
        <p>更多内容和讨论，欢迎添加 happypeter 的微信：happypeter1983</p>
        <img src='/images/weixin.jpeg' style={styles.img}/>
      </div>
    );
  }
})
