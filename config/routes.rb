Rails.application.routes.draw do
  get "/me", to: "users#show"

  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  post "/lost_dogs", to: "lost_dogs#create"
  
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
