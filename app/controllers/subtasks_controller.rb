class SubtasksController < ApplicationController
  before_action :authenticate_user!, except: [:show]

  before_action :check_permissions, only: [:edit, :update, :destroy]

  def index
    @subtasks = @goal.subtasks.all
  end

  def new
    @goal = Goal.find(params[:goal_id])
    @subtask = @goal.subtasks.new
  end

  def create
    @goal = Goal.find(params[:goal_id])
    @subtask = @goal.subtasks.new(subtask_params)
    if @subtask.save
      flash[:success] = 'Subtask saved successfully'
      redirect_to goal_path(@goal)
    else
      flash[:alert] = 'Problems saving subtask'
      @errors = @subtask.errors.full_messages
      render :new
    end
  end

    def show
      @goal = Goal.find(params[:goal_id])
      @subtasks = @goal.subtasks.find(params[:id])
    end


  private

  def goal_params
    params.require(:goal).permit(:name,
                                 :description,
                                 :created_at,
                                 :due_time)
  end

  def subtask_params
    params.require(:subtask).permit(:name)
  end
end
