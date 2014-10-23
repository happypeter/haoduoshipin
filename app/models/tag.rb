class Tag < ActiveRecord::Base
  has_many :taggings, :dependent => :destroy
  has_many :episodes, :through => :taggings
  attr_accessible :name

  def self.with_names(names)
    names.map do |name|
      Tag.find_or_create_by(name: name)
    end
  end

  def display_name
    #name.titleize.gsub("E ", "e")
    name
  end

  def self.home_page_tags
    pair = {}
    Tag.all.map{ |t| { t.name => t.episodes.count } }.each{ |h| pair.merge! h }

    pair.sort_by{ |k, v| v }.reverse.take(6)
  end
end
