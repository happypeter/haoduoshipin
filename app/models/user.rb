class User < ActiveRecord::Base
  attr_accessible :name, :email, :site_url
  before_create { generate_token(:token) }
  has_many :comments

  validates_uniqueness_of :name  
  def self.create_from_omniauth(omniauth)
    User.new.tap do |user|
      user.github_uid = omniauth["uid"]
      user.github_username = omniauth["user_info"]["nickname"]
      user.email = omniauth["user_info"]["email"]
      user.name = omniauth["user_info"]["name"]
      user.site_url = omniauth["user_info"]["urls"]["Blog"] if omniauth["user_info"]["urls"]
      user.gravatar_token = omniauth["extra"]["user_hash"]["gravatar_id"] if omniauth["extra"] && omniauth["extra"]["user_hash"]
      user.save!
    end
  end


  def self.authenticate(name, password)  
    user = find_by_name(name)  
    if user && user.password_hash == BCrypt::Engine.hash_secret(password, user.password_salt)  
      user  
    elsif user && (user.password_hash == nil)
    # when the user lost his password, I will go to mysql and remove password_hash
    # then the user can login without password, and update his profile to give
    # a new password
      user
    else  
      nil  
    end  
  end  
  def generate_token(column)
    begin
      self[column] = SecureRandom.urlsafe_base64
    end while User.exists?(column => self[column])
  end
end
