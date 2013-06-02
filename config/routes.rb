Happycasts::Application.routes.draw do

  resources :users
  resources :episodes
  resources :comments
  resources :password_resets

  get "/latest_comment" => "comments#latest_comment"
  get "/all" => "episodes#all"

  match "/search" => "search#index", :as => :search
  match "/auth/:provider/callback" => "users#login_with_github"
  get "/account" => "users#edit", :as => "account"
  match "/auth/failure" => "users#login_with_github_failure"
  match "/about" => "info#about", :as => "about"
  get "/new_mail" =>"users#newmail"
  post "/send_mail" =>"users#sendmail"
  post "/new_ep_release_mail/:id" => "users#new_ep_release_mail"
  match "signup" => "users#signup", :as => "signup"
  match "login" => "users#new", :as => "login"
  match "user_login" => "users#login"
  match "logout" => "users#logout", :as => "logout"

  root :to => "episodes#index"

end
