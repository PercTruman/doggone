Rails.application.routes.draw do
  get "/me", to: "users#show"
  
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
