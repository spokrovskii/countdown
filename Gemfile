source 'https://rubygems.org/'

ruby "2.3.0"

gem 'rails', '4.2.6'
gem 'pg', '~> 0.15'
gem 'sass-rails', '~> 5.0', '>= 5.0.6'
gem 'uglifier', '>= 1.3.0'
gem 'jquery-rails'
gem 'devise'
gem 'omniauth-oktaoauth'
gem 'activerecord-session_store'
gem 'figaro'
gem 'carrierwave'
gem 'font-awesome-rails'
gem 'pusher'
gem 'pg_search'
gem 'twitter'
gem 'bootstrap-sass', '~> 3.3.1'
gem 'autoprefixer-rails'
gem 'foreman'

group :development, :test do
  gem 'capybara'
  gem 'factory_girl_rails'
  gem 'rspec-rails', '~> 3.0'
  gem 'pry-rails'
  gem 'shoulda'
  gem 'valid_attribute'
  gem 'shoulda-matchers', require: false
  gem 'dotenv-rails'
  gem 'mailcatcher'
end

group :test do
  gem 'launchy', require: false
  gem 'coveralls', require: false
  gem 'poltergeist'
  gem 'capybara-webkit'
  gem 'database_cleaner'
end

group :production, :development do
  gem 'fog'
end

group :production do
  gem 'rails_12factor'
end
