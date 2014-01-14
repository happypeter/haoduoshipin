class AddGoogleUidAndGoogleUserNameToUsers < ActiveRecord::Migration
  def change
    add_column :users, :google_uid, :string
    add_column :users, :google_username, :string
  end
end
