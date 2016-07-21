class AddUsernameToUsers < ActiveRecord::Migration
  def change
    add_column :users, :user_first_name, :string, null: false, default: ''
    add_column :users, :user_last_name, :string, null: false, default: ''
    add_index :users, [:user_first_name, :user_last_name]
  end
end
