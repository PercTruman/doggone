Rails.application.routes.draw do
  get "/users", to: "users#index"
  get "/me", to: "users#show"
  get "/lost_dogs", to: "lost_dogs#index"
  get "/seen_dogs/:id", to: "lost_dogs#show"
  get "/sightings/:id", to: "sightings#show"
  get "/sightings", to: "sightings#index"
  get "/posts", to: "posts#index"
  get "/posts/:id", to: "posts#show"

  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  post "/lost_dogs", to: "lost_dogs#create"
  post "/sightings", to: "sightings#create"
  post "/posts", to: "posts#create"
  

  patch "/lost_dogs/:id", to: "lost_dogs#update"
  patch "/posts/:id", to: "posts#update"

  delete "/lost_dogs/:id", to: "lost_dogs#destroy"
  delete "/posts/:id", to: "posts#destroy"
  delete '/logout', to: 'sessions#destroy'
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
