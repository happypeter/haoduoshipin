Rails.application.config.middleware.use OmniAuth::Builder do
  # Sign up at https://github.com/account/applications
  provider :github, Settings.github.id, Settings.github.secret, scope: "(no scope)"
end
