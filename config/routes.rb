Rails.application.routes.draw do
  get "/users", to: "users#index"
  get "/me", to: "users#show"
  get "/lost_dogs", to: "lost_dogs#index"

  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  post "/lost_dogs", to: "lost_dogs#create"
  post "/sightings", to: "sightings#create"

  patch "/lost_dogs/:id", to: "lost_dogs#update"

  delete "/lost_dogs/:id", to: "lost_dogs#destroy"
  delete '/logout', to: 'sessions#destroy'
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
