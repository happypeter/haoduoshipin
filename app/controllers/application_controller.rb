class ApplicationController < ActionController::Base
  protect_from_forgery

  helper_method :current_user
  before_filter :set_locale
   
  def set_locale
    I18n.locale = params[:locale] || "zh-CN" # default to chinese, need http://casts.sme.com/?locale=en to switch to English
  end

  private

  def current_user
    @current_user ||= User.find_by_token(cookies[:token]) if cookies[:token]
  end
  enable_authorization do |exception|
    redirect_to root_url, :alert => exception.message
  end

  def redirect_to_target_or_default(default, *options)
    redirect_to(session[:return_to] || default, *options)
    session[:return_to] = nil
  end  
end
