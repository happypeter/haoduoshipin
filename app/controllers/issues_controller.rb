class IssuesController < ApplicationController
  def index
    session[:return_to] = request.url
    @issues = Issue.all
  end

  def show
    session[:return_to] = request.url
    @issue = Issue.find(params[:id])
  end

  def new
    @issue = Issue.new
  end

  def create
    @issue = Issue.new(params[:issue])
    @issue.user_id = current_user.id
    if @issue.save
      redirect_to @issue
    else
      render :new
    end
  end
end
