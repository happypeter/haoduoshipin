class Ability
  include CanCan::Ability
  user ||= User.new

  def initialize(user)
    if user # the user is just the current_user, if you are not logged in, the user will be nil 
      if user.id
      end
    end
    can :read, :episodes
    can :destory, :all
  end
end
