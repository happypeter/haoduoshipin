class RemoveEpisodeIdFromComments < ActiveRecord::Migration
  def change
    remove_column :comments, :episode_id, :integer
  end
end
