Rails.application.routes.draw do
  get "/users", to: "users#index"
  get "/me", to: "users#show"
  get "/dogs", to: "lost_dogs#index"
  get "/dogs/:id", to: "lost_dogs#show"
  get "/sightings/:id", to: "sightings#show"
  get "/sightings", to: "sightings#index"
  get "/posts", to: "posts#index"
  get "/posts/:id", to: "posts#show"

  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  post "/dogs", to: "lost_dogs#create"
  post "/sightings", to: "sightings#create"
  post "/posts", to: "posts#create"
  

  patch "/dogs/:id", to: "lost_dogs#update"
  patch "/posts/:id", to: "posts#update"

  delete "/dogs/:id", to: "lost_dogs#destroy"
  delete "/posts/:id", to: "posts#destroy"
  delete '/logout', to: 'sessions#destroy'
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
