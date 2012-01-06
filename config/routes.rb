Happycasts::Application.routes.draw do
  
  resources :users
  resources :episodes
  resources :sessions
  resources :comments

  match "/auth/:provider/callback" => "users#create"
  match "about" => "info#about", :as => "about"
  get "log_out" => "users#logout", :as => "log_out"  
  get "sign_up" => "users#new", :as => "sign_up"  

  root :to => "episodes#index"

end
