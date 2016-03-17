PageNotFound = React.createClass({
  render() {
    return (
      <div className='page-not-found'>
        <Hamburger iconColor='#00bcd4' />
        <div className='cartoon'>
          <img src='/images/peter.jpeg' />
          <div className='tip'>Page Not Found</div>
        </div>
      </div>
    );
  }
});
