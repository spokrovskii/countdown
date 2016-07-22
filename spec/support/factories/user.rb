FactoryGirl.define do
  factory :user do
    sequence(:email) { |number| "Email_#{number}@mailinator.com" }
    first_name 'first_name'
    last_name 'last_name'
    password 'password'
  end
end
