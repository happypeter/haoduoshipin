class Ability
  include CanCan::Ability

  def initialize(user)
    can :read, :episodes, ["published_at <= ?", Time.zone.now] do |episode|
      episode.published_at <= Time.now.utc
    end
    can :access, :info # everybody can visit the about page
    can [:read, :create, :log_in], :users
    if user # when sb logged in
      can :log_out, :users
      can :update, :users, :id => user.id
      if user.name == "happypeter"
        can :access, :all
      end
    end
  end
end
