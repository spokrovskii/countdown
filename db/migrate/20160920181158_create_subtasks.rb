class CreateSubtasks < ActiveRecord::Migration
  def change
    create_table :subtasks do |t|
      t.integer :goal_id
    end
  end
end
