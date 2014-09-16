Rails.application.routes.draw do
  

  get 'poets/index'

  get 'poets/' => 'poets#index'
  post 'poets/' => 'poets#create'

  get 'poets/new' => 'poets#new', as: :new_poet
  get 'poets/:id/edit' => 'poets#edit', as: :edit_poet

  get 'poets/:id' => 'poets#show', as: :poet
  patch 'poets/:id' => 'poets#update'
  put 'poets/:id' => 'poets#update'
  delete 'poets/:id' => 'poets#destroy'


  root 'poets#index'


end
