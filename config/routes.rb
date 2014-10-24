Happycasts::Application.routes.draw do
  resources :users
  resources :episodes
  resources :comments
  resources :password_resets
  resources :notifications

  get "/donate" => "users#donate"
  get "/latest_comment" => "comments#latest_comment"
  get "index" => "episodes#index"
  get "index/:tag" => "episodes#tag", :as => "tag"
  get "/all" => "episodes#all"
  get "/auth/:provider/callback" => "users#login_with_providers"
  get "/account" => "users#edit", :as => "account"
  get "/auth/failure" => "users#login_with_github_failure"
  get "/about" => "info#about", :as => "about"
  get "/new_mail" =>"users#newmail"
  post "/send_mail" =>"users#sendmail"
  post "/new_ep_release_mail/:id" => "users#new_ep_release_mail"
  get "signup" => "users#signup", :as => "signup"
  get "login" => "users#new", :as => "login"
  post "user_login" => "users#login"
  get "logout" => "users#logout", :as => "logout"

  if Rails.env.development?
    mount MailPreview => 'mail_view'
  end

  root :to => "home#welcome"
end
