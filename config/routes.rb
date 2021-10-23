Rails.application.routes.draw do
  resources :comment_com_types
  resources :com_types
  resources :comments
  resources :lit_texts, only: [:index, :show, :create, :update]
  resources :users, only: [:index, :show, :update, :destroy]

  post "/signup", to: "users#create"
  get "/auth", to: "users#auth_show"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get "/recent_comments", to: "comments#recent"
  get "/recent_lit_texts", to: "lit_texts#recent"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
