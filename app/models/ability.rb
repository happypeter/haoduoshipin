class Ability
  include CanCan::Ability

  def initialize(user)
    can :read, :episodes, ["published_at <= ?", Time.zone.now] do |episode|
      episode.published_at <= Time.now.utc
    end
    if user # when sb logged in
      if user.name == "happypeter"
        can :access, :all
      end
    end
  end
end
