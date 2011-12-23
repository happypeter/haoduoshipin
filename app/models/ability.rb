class Ability
  include CanCan::Ability

  def initialize(user)
    can :read, :episodes
    if user && user.name == "happypeter"
      can :create, :episodes
    end
  end
end
