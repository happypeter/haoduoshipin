class AddTitleToEpisodes < ActiveRecord::Migration
  def change
    add_column :episodes, :title, :string
  end
end
