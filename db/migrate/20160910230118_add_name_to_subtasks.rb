class AddNameToSubtasks < ActiveRecord::Migration
  def change
    add_column :subtasks, :name, :string
  end
end
