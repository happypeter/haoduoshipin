class SessionsController < ApplicationController
  def new
    @user = User.new  
  end

  def create  
    user = User.authenticate(params[:name], params[:password])  
    if user
      cookies.permanent[:token] = user.token
      redirect_to root_url, :notice => "Logged in!"
    else
      flash.now.alert = "Invalid name or password"
      redirect_to :action => "new" 
      # render "new", won't have a new @user instance, which result in failing to render new.html.erb
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url, :notice => "Logged out!"
  end
end
