class AddNoteToEpisodes < ActiveRecord::Migration
  def change
    add_column :episodes, :note, :text
  end
end
