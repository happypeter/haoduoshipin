Happycasts::Application.routes.draw do
  
  resources :users
  resources :episodes
  resources :comments

  match "/auth/:provider/callback" => "users#login_with_github"
  match "/auth/failure" => "users#login_with_github_failure"
  match "/about" => "info#about", :as => "about"
  match "/new_mail" =>"users#newmail" 
  match "/send_mail" =>"users#sendmail" 
  match "signup" => "users#signup", :as => "signup"  
  match "login" => "users#new", :as => "login"  
  match "user_login" => "users#login"
  match "logout" => "users#logout", :as => "logout"  

  root :to => "episodes#index"

end
