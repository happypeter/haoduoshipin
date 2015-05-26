Happycasts::Application.routes.draw do

  resources :users

  # use v/12 as video link, but keep the old one works
  resources :episodes, :path => 'v'
  get '/episodes/:id', to: redirect('/v/%{id}')

  resources :comments
  resources :password_resets
  resources :notifications


  # issues
  get "/close/:id" => "issues#close", :as => "close_issue"
  resources :issues, :path => "q"
  # 有了上面这一行，link_to @issue 或者 link_to @comment.commentable 就可以指向 q/3 这样的链接了


  get "/courses" => "page#courses"
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
  get "/u/:username" => "users#show", :as => "profile"
  get "/u" => "users#index"
  post "/add_episode_heart/:id" => "episodes#add_heart", :as => "add_episode_heart"

  if Rails.env.development?
    mount MailPreview => 'mail_view'
  end

  root :to => "page#welcome"
end
