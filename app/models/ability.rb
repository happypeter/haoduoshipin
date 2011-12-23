class Ability
  include CanCan::Ability

  def initialize(user)
    can :read, :episodes
  end
end
