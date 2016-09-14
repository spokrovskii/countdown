class RemoveSubtaskFromSubtasks < ActiveRecord::Migration
  def change
    remove_column :subtasks, :subtask, :string
  end
end
