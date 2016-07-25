require 'rails_helper'

feature 'User can sign in with existing account', %{
  As a user
  I want to sign in using my exisiting credentials
  So that I can be authenticated and use more features of the site
} do
  let(:user) { FactoryGirl.create(:user) }

  scenario 'signs in with an account' do
  visit root_path
    click_link 'Sign In'
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log in'
    expect(page).to have_content I18n.t 'devise.sessions.signed_in'
  end
end
