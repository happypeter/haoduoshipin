class IssuesController < ApplicationController
  def index
    @issues = Issue.all
  end

  def show
    @issue = Issue.find(params[:id])
  end

  def new
    @issue = Issue.new
  end

  def create
    @issue = Issue.new(params[:issue])
    if current_user
      @issue.user_id = current_user.id
    else
      @issue.user_id = 0 # 允许匿名发帖
    end
    if @issue.save
      redirect_to @issue
    else
      render :new
    end
  end
end
