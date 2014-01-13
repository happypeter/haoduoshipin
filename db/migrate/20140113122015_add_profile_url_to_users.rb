class AddProfileUrlToUsers < ActiveRecord::Migration
  def change
    add_column :users, :profile_url, :string
  end
end
