Rails.application.config.middleware.use OmniAuth::Builder do
  # Sign up at https://github.com/account/applications
  provider :github, Settings.github.id, Settings.github.secret
  provider :google_oauth2, Settings.google.id, Settings.google.secret,
    {
      :name => "google",
      :scope => "userinfo.email, userinfo.profile, plus.me",
      :prompt => "select_account",
      :image_aspect_ratio => "square",
    }
end
