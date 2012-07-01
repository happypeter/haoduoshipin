class User < ActiveRecord::Base
  attr_accessor :password

  before_validation :strip_blanks
  validates_confirmation_of :password

  before_create { generate_token(:token) }# will this be called before "user.save!"???
  has_many :comments
  #validates_presence_of :password, :on => :create # validate this with client
  #side code
  validates_presence_of :name

  def self.create_from_omniauth(omniauth)
    create! do |user|
      user.github_uid = omniauth["uid"]
      user.github_username = omniauth["info"]["name"]
      user.email = omniauth["info"]["email"]
      user.name = omniauth["info"]["nickname"] 
      user.site_url = omniauth["info"]["urls"]["Blog"] if omniauth["info"]["urls"]
      user.gravatar_token = omniauth["extra"]["raw_info"]["gravatar_id"] if omniauth["extra"] && omniauth["extra"]["raw_info"]
    end
  end

  def encrypt_password
    if password.present?
      self.password_salt = BCrypt::Engine.generate_salt
      self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
    end
  end


  def self.authenticate(name, password)  
    user = find_by_name(name)  
    if user && !user.password_salt.blank? && user.password_hash == BCrypt::Engine.hash_secret(password, user.password_salt)  
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
  def strip_blanks
    self.name = self.name.strip
    self.email = self.email.strip
  end

end
