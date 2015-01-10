Happycasts::Application.routes.draw do
  resources :users
  resources :episodes
  resources :comments
  resources :password_resets
  resources :notifications

  get "/books" => "page#books"
  get "/testimonials" => "page#testimonials"
  get "comments" => "comments#index"
  get "/search" => "page#search"
  get "/stats" => "page#stats"
  get "/donate" => "page#donate"
  get "/all" => "episodes#all"
  get "tags" => "episodes#tags"
  get "tag/:tag" => "episodes#tag", :as => "tag"
  get "/auth/:provider/callback" => "users#login_with_providers"
  get "/account" => "users#edit", :as => "account"
  get "/auth/failure" => "users#login_with_github_failure"
  get "/about" => "page#about", :as => "about"
  post "/new_ep_release_mail" => "users#new_ep_release_mail"
  get "/signup" => "users#signup", :as => "signup"
  get "/login" => "users#login", :as => "login"
  post "create_login_session" => "users#create_login_session"
  get "logout" => "users#logout", :as => "logout"
  get "/:username" => "users#show", :as => "profile"
  post "/add_episode_heart/:id" => "episodes#add_heart", :as => "add_episode_heart"

  if Rails.env.development?
    mount MailPreview => 'mail_view'
  end

  root :to => "page#welcome"
end
