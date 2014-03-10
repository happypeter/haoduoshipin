Resque::Server.use(Rack::Auth::Basic) do |user, password|
  password == Settings.resque.secret
end
