Happycasts::Application.routes.draw do
  
  resources :users
  resources :episodes
  resources :comments

  match "/auth/:provider/callback" => "users#login_with_github"
  match "/auth/failure" => "users#login_with_github_failure"
  match "/user_login" =>"users#login" # when user try to login with their local account
  match "/about" => "info#about", :as => "about"
  get "log_in" => "users#new", :as => "log_in"  
  get "log_out" => "users#logout", :as => "log_out"  

  root :to => "episodes#index"

end
