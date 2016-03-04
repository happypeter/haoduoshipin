AuthErrors = React.createClass({
  propTypes: {
    errors: React.PropTypes.object
  },

  getStyles() {
    return {
      root: {
        borderLeft: '3px solid #f44336',
        backgroundColor: '#fcf8f2',
        width: '256px',
        padding: '20px',
        marginBottom: '15px'
      },
      error: {
        fontSize: 14,
        lineHeight: '18px',
        color: '#f44336',
        textAlign: 'left'
      }
    };
  },

  render() {
    let styles = this.getStyles();

    if (!_.isEmpty(this.props.errors)) {
      return (
        <div style={styles.root}>
          {
            _.values(this.props.errors).map(function (errorMessage) {
              return (
                <div key={errorMessage} style={styles.error}>
                  {errorMessage}
                </div>
              );
            })
          }
        </div>
      );
    } else {
      return <span />
    }
  }
});
