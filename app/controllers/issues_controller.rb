class IssuesController < ApplicationController
  before_action :check_admin, :only => [:close]

  def index
    session[:return_to] = request.url
    if params[:state] == nil || params[:state] == "open"
      @issues = Issue.open.reverse
    else
      @issues = Issue.closed.reverse
    end
    @open_count = Issue.open.count
    @closed_count = Issue.closed.count
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

  def close
    @issue = Issue.find(params[:id])
    @issue.closed = true
    if @issue.save
      redirect_to issues_path
    else
      render @issue
    end
  end
end
