Ccc::Application.routes.draw do
  
  resources :users
  resources :episodes
  resources :sessions
  get "log_in" => "sessions#new", :as => "log_in" 
  get "log_out" => "sessions#destroy", :as => "log_out"  
  get "sign_up" => "users#new", :as => "sign_up"  

  root :to => "episodes#index"



  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end
