Rails.application.routes.draw do
  root 'homepage#index'
  namespace :api do
    namespace :v1 do
      get 'addressbooks/index'
      post 'addressbooks/create'
      delete '/destroy/:id', to: 'addressbooks#destroy'
     
    end
  end
 
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
