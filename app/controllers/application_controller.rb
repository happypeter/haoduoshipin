class ApplicationController < ActionController::Base
  protect_from_forgery

  helper_method :current_user

  private

  def current_user
    @current_user ||= User.find_by_token(cookies[:token]) if cookies[:token]
  end
  enable_authorization do |exception|
    redirect_to root_url, :alert => exception.message
  end
end
