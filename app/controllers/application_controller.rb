class ApplicationController < ActionController::Base
  protect_from_forgery

  helper_method :current_user, :avatar_url

  before_filter :init

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  def init
    set_locale
    count_unread_notification
  end

  private

  def current_user
    @current_user ||= User.find_by_token(cookies[:token]) if cookies[:token]
  end

  def redirect_to_target_or_default(default, *options)
    redirect_to(session[:return_to] || default, *options)
    session[:return_to] = nil
  end

  def count_unread_notification
    if current_user
      @unread_count = current_user.notifications.where(unread: true).count
    else
      @unread_count = 0
    end
  end

  def check_admin
    unless current_user && current_user.admin?
      redirect_to :root, :notice => "Only admin can do this."
    end
  end

  def avatar_url(user)
    if user.profile_url.blank?
      default_url = "#{root_url}assets/cat.png"
      gravatar_id = Digest::MD5.hexdigest(user.email.try(:downcase).to_s) # some github user has NULL email
      "http://gravatar.com/avatar/#{gravatar_id}.png?s=512&d=#{CGI.escape(default_url)}"
    else
      user.profile_url
    end
  end
end
