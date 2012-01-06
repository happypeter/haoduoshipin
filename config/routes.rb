Happycasts::Application.routes.draw do
  
  resources :users
  resources :episodes
  resources :sessions
  resources :comments

  match "/auth/:provider/callback" => "users#login_with_github"
  match "about" => "info#about", :as => "about"
  get "log_in" => "sessions#new", :as => "log_in"  
  get "log_out" => "users#logout", :as => "log_out"  

  root :to => "episodes#index"

end
