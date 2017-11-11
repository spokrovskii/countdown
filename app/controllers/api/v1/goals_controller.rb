class Api::V1::GoalsController < ApiController
  before_action :authenticate_user!

  def index
    goals = Goal.where(user: current_user)

    render json: { goals: goals}, status: :ok
  end

  def create
    goal = Goal.new( text: params[:goal])
    if goal.saved
      render json: { goal: goal }
    else
      render json: { error: fortune.errors.full_messages }, status: :unprocessable_entity
    end
  end


end
