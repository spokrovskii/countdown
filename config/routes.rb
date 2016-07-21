Rails.application.routes.draw do
  get 'home/index'

  devise_for :users

  root 'homepage#index'

  resources :homepage, only: [:index]

  resources :admin_users, only: [:index, :destroy]

  resources :goals, only: [:index, :show]
end
