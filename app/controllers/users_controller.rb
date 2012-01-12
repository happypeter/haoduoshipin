class UsersController < ApplicationController  
  load_and_authorize_resource
  def new  
  end
  def edit
    @user = User.find(params[:id])  
  end

  def update
    @user = User.find(params[:id])  
    respond_to do |format|
      if @user.update_attributes(params[:user])
        format.html { redirect_to(@user, :notice => 'Profile was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @post.errors, :status => :unprocessable_entity }
      end
    end
  end  

  def login_with_github #this will create a new user acount on local db, if this is the first time login
    omniauth = request.env["omniauth.auth"]
    # if find_by_github_uid return ture, create_from_omniauth won't be
    # executed. that's the nature of || 
    @user = User.find_by_github_uid(omniauth["uid"]) || User.create_from_omniauth(omniauth)
    cookies.permanent[:token] = @user.token
    redirect_to root_url, :notice => "Signed in successfully"
  end

  def create # signup a new user account locally
    @user = User.new(params[:user])
    @user.encrypt_password
    @user.save
    cookies.permanent[:token] = @user.token
    redirect_to root_url, :notice => "Signed in successfully"
  end

  def login  #login with a local account
    user = User.authenticate(params[:name], params[:password])  
    if user
      cookies.permanent[:token] = user.token
      redirect_to root_url, :notice => "Logged in!"
    else
      flash.alert = "Invalid name or password"
      redirect_to :action => "new"
    end

  end

  def logout
    cookies.delete(:token)
    redirect_to root_url, :notice => "You have been logged out."
  end

  def index
    @users = User.all
    respond_to do |format|
      format.html # index.html.erb
    end
  end

  def show
    if params[:name]
      @user = User.where(:name => params[:name]).first
    else
      @user = User.find(params[:id])
    end

    if @user == nil
      redirect_to root_url, :notice => "no such user!"  
    else
      respond_to do |format|
        format.html # show.html.erb
      end
    end
  end
end

