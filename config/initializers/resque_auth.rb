Resque::Server.use(Rack::Auth::Basic) do |user, password|
  user == Settings.resque.user && password == Settings.resque.secret
end
