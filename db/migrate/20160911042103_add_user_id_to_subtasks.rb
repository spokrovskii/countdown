class AddUserIdToSubtasks < ActiveRecord::Migration
  def change
    add_column :subtasks, :user_id, :integer
  end
end
