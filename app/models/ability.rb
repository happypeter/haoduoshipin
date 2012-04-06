class Ability
  include CanCan::Ability

  def initialize(user)
    can :read, :episodes, ["published_at <= ?", Time.zone.now] do |episode|
      episode.published_at <= Time.now.utc
    end
    can :access, :info # everybody can visit the about page
    can [:login, :read, :create, :login_with_github], :users
    if user # when sb logged in
      can [:edit, :update], :users, :id => user.id
      can [:create, :update], :comments
      can :logout, :users
      if user.github_username == "happypeter"||user.name == "happypeter" # the latter is for test on VM
        can :access, :all
      end
    end
  end
end
