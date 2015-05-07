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
    @issue.user_id = current_user.id
    if @issue.save
      redirect_to @issue, :notice => "Successfully created question."
    else
      render :new
    end
  end
end
