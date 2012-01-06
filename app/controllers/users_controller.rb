class UsersController < ApplicationController  
  def new  
    @user = User.new  
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
  def create
    omniauth = request.env["omniauth.auth"]
    @user = User.find_by_github_uid(omniauth["uid"]) || User.create_from_omniauth(omniauth)
    cookies.permanent[:token] = @user.token
    redirect_to root_url, :notice => "Signed in successfully"
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

