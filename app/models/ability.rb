class Ability
  include CanCan::Ability

  def initialize(user)
    can :read, :episodes, ["published_at <= ?", Time.zone.now] do |episode|
      episode.published_at <= Time.now.utc
    end
    can :access, :info # everybody can visit the about page
    can [:read, :create, :login_with_github], :users
    can [:new, :create], :sessions
    if user # when sb logged in
      can [:destroy], :sessions
      can :update, :users, :id => user.id
      can :logout, :users
      if user.github_username == "happypeter"
        can :access, :all
      end
    end
  end
end
