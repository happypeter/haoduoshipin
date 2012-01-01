Ccc::Application.routes.draw do
  
  resources :users
  resources :episodes
  resources :sessions
  resources :comments

  match "about" => "info#about", :as => "about"
  get "log_in" => "sessions#new", :as => "log_in" 
  get "log_out" => "sessions#destroy", :as => "log_out"  
  get "sign_up" => "users#new", :as => "sign_up"  

  root :to => "episodes#index"

end
