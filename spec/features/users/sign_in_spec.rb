require 'rails_helper'

feature 'User create an account', %{
  As a user
  I want to create an account
  So that I can create goal and plan subgoals
} do
  scenario 'visits sign up page' do
    visit root_path
    expect(page).to have_content 'Sign Up'
  end

  scenario 'creates an account' do
    visit new_user_registration_path
    save_and_open_page
    click_link 'Sign Up'
    fill_in 'Email', with: 'countdown@mailinator.com'
    fill_in 'First name', with: 'Alex'
    fill_in 'Last name', with: 'Jarvis'
    fill_in 'Password', with: 'abc12345'
    fill_in 'Password confirmation', with: 'abc12345'
    click_button 'Sign up'

    expect(page).to have_content I18n.t 'devise.registrations.signed_up'
  end
end
