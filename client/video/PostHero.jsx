PostHero = React.createClass({
  render() {
    let styles = {
      root: {
        backgroundColor: '#00bcd4',
        textAlign: 'center',
        paddingTop: '120px',
        paddingBottom: '55px',
        marginBottom: '30px'
      },
      title: {
        fontSize: '2em',
        color: '#fff',
        marginBottom: '15px',
        lineHeight: 1.1
      },
      date: {
        color: '#fff'
      }
    };

    let meta = this.props.metaData;
    let title, date;
    if(!_.isEmpty(meta)) {
      title = meta.title;
      date = meta.created_at;
    }

    return (
      <div style={styles.root}>
        <div style={styles.title}>{title}</div>
        <div style={styles.date}>{date}</div>
      </div>
    );
  }
});
