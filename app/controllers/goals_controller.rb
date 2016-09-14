class GoalsController < ApplicationController
  before_action :authenticate_user!, except: [:show]

  before_action :check_permissions, only: [:edit, :update, :destroy]

  def index
    @goals = current_user.goals
  end

  def show
    @goal = Goal.find(params[:id])
    @subtasks = @goal.subtasks
  end

  def new
    @goal = Goal.new
  end

  def create
    @goal = Goal.new(goal_params)
    @goal.user = current_user
    if @goal.save
      flash[:success] = 'Goal saved successfully'
      redirect_to goal_path(@goal)
    else
      flash[:alert] = 'Problems saving goal'
      @errors = @goal.errors.full_messages
      render 'goals/new'
    end
  end

  def edit
    @goal = Goal.find(params[:id])
  end

  def update
    @goal = Goal.find(params[:id])
    if @goal.update(goal_params)
      flash[:success] = 'Goal saved successfully'
      redirect_to goal_path(@goal)
    else
      flash[:alert] = 'Problems updating goal'
      @errors = @goal.errors.full_messages
      render 'goals/edit'
    end
  end

  def destroy
    @goal = Goal.find(params[:id])
    if @goal.destroy
      flash[:success] = 'Goal deleted successfully'
      redirect_to goals_path
    else
      flash[:alert] = 'Problems deleting goal'
      redirect_to goal_path(@goal)
    end
  end

  private

  def goal_params
    params.require(:goal).permit(:name,
                                 :description,
                                 :created_at,
                                 :due_time)
  end
end
