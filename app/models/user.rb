class User < ActiveRecord::Base
  attr_accessor :password

  #user may submit "hisname ", so this is nice to have
  before_validation :strip_blanks

  before_create { generate_token(:token) }
  has_many :comments

  #validate the below two with client-side code
  #
  #  validates_confirmation_of :password
  #  validates_presence_of :password, :on => :create 
  #
  #this has two advatages:
  #  1. fast
  #  2. when login with github, there is no password

  validates_presence_of :name
  validates_uniqueness_of :name, :case_sensitive => false


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

  def send_password_reset
    generate_token(:password_reset_token)
    self.password_reset_sent_at = Time.zone.now
    save!
    HappyMailer.password_reset(self).deliver
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
    self.name = self.name.strip if self.name
    self.email = self.email.strip if self.email
  end

end
