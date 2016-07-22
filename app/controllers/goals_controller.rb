class GoalsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  def index
    @goals = Goal.all
  end

  def show
    @goal = Goal.find(params[:id])
  end
end
