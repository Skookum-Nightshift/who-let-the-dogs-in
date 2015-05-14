Rails.application.routes.draw do

  scope :api do
    get 'foursquare', to: 'api#foursquare'
    get 'yelp', to: 'api#yelp'
  end

  get '/terms', to: 'pages#terms'
  get '*any', to: 'pages#not_found'
  root 'pages#index'
end
