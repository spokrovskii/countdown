require 'rails_helper'

feature 'View all goals' do
  let(:current_user) { FactoryGirl.create(:user) }

  before do
    login_user(current_user)
  end

  scenario 'When user sing ins see all goals that belongs to that user.' do
    goals = FactoryGirl.create_list(:goal, 3, user: current_user)
    visit goals_path
    expect(page).to have_content('GOALS')
    goals.each do |goal|
      expect(page).to have_content(goal.name)
    end
  end
end
