class Ability
  include CanCan::Ability

  def initialize(user)
    can :read, :episodes
    if user # when sb logged in
      if user.name == "happypeter"
        can :create, :episodes
      end
    end
  end
end
