class Api::V1::GoalsController < ApiController
  before_action :authenticate_user!

  def index
    goals = Goal.where(user: current_user)

    render json: { goals: goals}, status: :ok
  end

  def create
    goal = Goal.new(goal_params)
    goal.user_id = params[:user_id]
    goal.user = current_user
    if goal.save
          render json: { goal: goal, message: 'Goal created!' }, status: :ok
        else
          render json: { goal: goal,
                         message: 'There were problems creating that note.',
                         errors: errors
                       }, status: :bad_request
        end
  end

  private
  def goal_params
    params.require(:goal).permit(:name, :description, :due_time)
  end
end
