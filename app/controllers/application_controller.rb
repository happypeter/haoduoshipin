class ApplicationController < ActionController::Base
  protect_from_forgery

  helper_method :current_user

  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  enable_authorization do |exception|
    redirect_to root_url, :alert => exception.message
  end
end
