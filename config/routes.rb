Happycasts::Application.routes.draw do
  resources :users
  resources :episodes
  resources :comments
  resources :password_resets
  resources :notifications

  get "/stats" => "page#stats"
  get "/donate" => "users#donate"
  get "/latest" => "episodes#latest"
  get "/latest_comment" => "comments#latest_comment"
  get "tags" => "episodes#tags"
  get "tag/:tag" => "episodes#tag", :as => "tag"
  get "/auth/:provider/callback" => "users#login_with_providers"
  get "/account" => "users#edit", :as => "account"
  get "/auth/failure" => "users#login_with_github_failure"
  get "/about" => "page#about", :as => "about"
  post "/new_ep_release_mail/:id" => "users#new_ep_release_mail"
  get "signup" => "users#signup", :as => "signup"
  get "login" => "users#new", :as => "login"
  post "user_login" => "users#login"
  get "logout" => "users#logout", :as => "logout"
  get "/:username" => "users#show", :as => "profile"

  if Rails.env.development?
    mount MailPreview => 'mail_view'
  end

  root :to => "page#welcome"
end
