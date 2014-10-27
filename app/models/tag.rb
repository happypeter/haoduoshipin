class Tag < ActiveRecord::Base
  has_many :taggings, :dependent => :destroy
  has_many :episodes, :through => :taggings
  attr_accessible :name, :ep_count

  def self.with_names(names, old_tag_names)
    old = old_tag_names.split(' ')
    if old.empty?         # create a new episode
      names.map do |name|
        t = Tag.find_by(name: name)
        if t.present?
          t.ep_count += 1
          t.save
          t
        else
          Tag.create(name: name, ep_count: 1)
        end
      end
    else # update the episode
      shared = old & names
      deleted = old - shared
      added = names - shared
      if !shared.empty?
        s = shared.map do |name|
          Tag.find_by(name: name)
        end
      end
      if !deleted.empty?
        deleted.map do |name|
          t = Tag.find_by(name: name)
          t.ep_count -= 1
          if t.ep_count == 0
            t.destroy
          else
            t.save
          end
        end
      end
      if !added.empty?
        a = added.map do |name|
          t = Tag.find_by(name: name)
          if t.present?
            t.ep_count += 1
            t.save
            t
          else
            Tag.create(name: name, ep_count: 1)
          end
        end
      end
      if s.nil? && !a.nil?
        a
      elsif a.nil? && !s.nil?
        s
      else
        a + s
      end
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
