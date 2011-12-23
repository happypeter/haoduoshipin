class Ability
  include CanCan::Ability

  def initialize(user)
    can :read, :episodes
    if user
      can :create, :episodes
    end
  end
end
