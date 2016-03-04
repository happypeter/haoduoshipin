const {
  Router,
  Route,
  IndexRoute
} = ReactRouter;

const Routes = (
  <Route path="/" component={App}>
    <Route path="login" component={AuthLogIn} />
    <Route path="signup" component={AuthSignUp} />
    <Route path="about" component={About}/>
    <Route path="all" component={AllVideos}/>
    <Route path="/v/:id" component={Post} />
    <Route path="home" component={Home}/>
    <Route path="*" component={PageNotFound}/>
    <IndexRoute component={Home}/>
  </Route>
);

Meteor.startup(function() {
  ReactDOM.render((
    <Router history={browserHistory}>
      {Routes}
    </Router>
  ), document.getElementById("app-container"));
});
