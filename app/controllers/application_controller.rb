class ApplicationController < ActionController::Base
  protect_from_forgery

  helper_method :current_user
  before_filter :set_locale
   
  def set_locale
    I18n.locale = params[:locale] || "en"
    #I18n.locale = params[:locale] || "zh" # default to chinese, need http://casts.sme.com/?locale=en to switch to English
  end

  private

  def current_user
    @current_user ||= User.find_by_token(cookies[:token]) if cookies[:token]
  end
  enable_authorization do |exception|
    redirect_to root_url, :alert => exception.message
  end
end
