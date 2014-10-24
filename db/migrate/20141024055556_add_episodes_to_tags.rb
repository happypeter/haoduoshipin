class AddEpisodesToTags < ActiveRecord::Migration
  def change
    add_column :tags, :episodes, :integer
  end
end
