Rails.application.routes.draw do
  get "/me", to: "users#show"

  post "/signup", to: "users#create"
  
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
