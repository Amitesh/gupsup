Rails.application.routes.draw do
  
  devise_for :users

  root 'home#index'

  # Get boddy list
  get  'users/my_buddy_list' => 'users#my_buddy_list', format: :json

  # Get messages for conversation between given sender and recipient
  post 'conversations/get-messages' => 'conversations#get_messages', format: :json

  # Create message
  post 'messages' => 'messages#create', format: :json
  
  # Update status of messages
  post 'messages/status' => 'messages#update_status', format: :json

end
