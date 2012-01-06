class AddGithubStuffToUsers < ActiveRecord::Migration
  def self.up
    add_column :users, :token, :string
    add_column :users, :github_username, :string
    add_column :users, :site_url, :string
    add_column :users, :gravatar_token, :string
    add_column :users, :github_uid, :string
  end

  def self.down
    remove_column :users, :github_uid
    remove_column :users, :gravatar_token
    remove_column :users, :site_url
    remove_column :users, :github_username
    remove_column :users, :token
  end
end
