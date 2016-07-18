class GoalsController < ApplicationController
  def index
    @goals = Goals.all
  end
end
