class AddDefaultTrueToEmailSub < ActiveRecord::Migration
  def change
    change_column :users, :email_subscription, :boolean, :default => true
  end
end
