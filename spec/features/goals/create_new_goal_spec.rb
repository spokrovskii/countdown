require 'rails_helper'

feature 'Create a goal', %{
  As a user
  I want to create a goal
  So that I can add my goal on a page
} do
  let(:current_user) { FactoryGirl.create(:user) }
  let(:goal) { FactoryGirl.create(:goal, user: current_user) }

  before do
    login_user(current_user)
    visit new_goal_path(goal)
    end

  scenario 'User fills out form correctly' do
    fill_in('Name', with: goal['name'])
    fill_in('Description', with: goal['description'])
    select '2016', from: 'goal[due_time(1i)]'
    select 'July', from: 'goal[due_time(2i)]'
    select '29', from: 'goal[due_time(3i)]'

    click_button('Save Goal')

    expect(page).to have_content(goal['name'])
    expect(page).to have_content(goal['description'])
    expect(page).to have_content(goal['due_time.to_s'])
    expect(page).to have_content(goal['created_at.to_s'])
    expect(page).to have_content('Goal saved successfully')
  end

  scenario 'User submits blank form' do
    click_button('Save Goal')

    expect(page).to have_content('Problems saving goal')
    expect(page).to have_content("Name can't be blank")
    expect(page).to have_content("Description can't be blank")
  end

  scenario 'an unauthenticated user cannot create a goal' do
    logout

    visit new_goal_path

    expect(page).to have_content('You need to sign in or sign up before '\
                                 'continuing')
    expect(current_path).to eq(new_user_session_path)
  end
end
