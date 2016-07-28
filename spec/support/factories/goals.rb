FactoryGirl.define do
  factory :goal do
    sequence(:name) { |number| "Goal #{number}" }
    description { "description of my goal is here" }
    created_at { Time.now }
    due_time { 2.years.from_now.strftime('%a, %d %b %Y %H:%M:%S') }
    user_id { 123 }
  end
end
