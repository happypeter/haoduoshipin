class RenameEpisodesFromTags < ActiveRecord::Migration
  def change
    rename_column :tags, :episodes, :ep_count
  end
end
