class UsersController < ApplicationController
  before_filter :check_admin, :only => [:newmail, :new_ep_release_mail, :sendmail]

  def newmail
    @user = User.new
  end

  def new
  end

  def signup
    @user = User.new
  end

  def new_ep_release_mail
    @episode = Episode.find(params[:id])
    User.all.each do |u|
      if u.email_subscription?
        # should not pass user&episode object here, hi, we are using resque
        HappyMailer.new_ep_release(u, params[:id]).deliver
      end
    end
    redirect_to root_url, :notice => "Mail sent!"
  end

  def sendmail
    @mailbody = params[:mailbody]
    User.all.each do |u|
      if u.email_subscription?
        HappyMailer.mail_to_all(u, @mailbody).deliver
      end
    end
    redirect_to root_url, :notice => "Mail sent!"
  end

  def edit
    @user = User.find_by_name(current_user.name) if current_user
    if @user.nil?
      redirect_to_target_or_default :root, :notice => "login first plz"
    end
  end

  def update
    @user = User.find(params[:id])
    respond_to do |format|
      if @user.update_attributes(params[:user])
        @user.encrypt_password
        @user.save!
        format.html { redirect_to(@user, :notice => 'Profile was successfully updated.') }
      else
        format.html { render :action => "edit" }
      end
    end
  end

  def login_with_providers #this will create a new user acount on local db, if this is the first time login
    omniauth = request.env["omniauth.auth"]
    # if find_by_github_uid return ture, create_from_omniauth won't be
    # executed. that's the nature of ||
    if params[:provider] == "github"
      @user = User.find_by_github_uid(omniauth["uid"]) || User.create_from_omniauth(omniauth, params[:provider])
    else
      @user = User.find_by_google_uid(omniauth["uid"]) || User.create_from_omniauth(omniauth, params[:provider])
    end
    cookies.permanent[:token] = @user.token
    redirect_to_target_or_default root_url, :notice => "Signed in successfully"
  end

  def login_with_github_failure
    @reason = params[:message]
  end

  def create # create a local account
    @user = User.new(params[:user])
    @user.encrypt_password
    if @user.save
      cookies.permanent[:token] = @user.token
      redirect_to user_path(@user), :notice => "signed up!"
    else
      render "signup"
    end
  end

  def login  #login with a local account
    user = User.authenticate(params[:name], params[:password])
    if user
      cookies.permanent[:token] = user.token
      redirect_to_target_or_default root_url
    else
      flash.notice = "Invalid name or password"
      redirect_to :action => "new"
    end
  end

  def logout
    cookies.delete(:token)
    redirect_to root_url, :notice => "You have been logged out."
  end

  def index
    @users = User.page(params[:page]).per_page(30).order('id DESC')
    respond_to do |format|
      format.html
    end
  end

  def show
    if params[:name]
      @user = User.find_by_name(params[:name])
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
