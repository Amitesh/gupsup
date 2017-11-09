class Message < ActiveRecord::Base
  belongs_to :conversation
  belongs_to :sender, :foreign_key => :user_id, class_name: 'User'

  validates_presence_of :content, :conversation_id, :user_id

  def self.channels
    { 
      new_stream:  "/gupsup/streams/join", # when a user sign in
      new_message: "/gupsup/messages/new", # when a new message created
      message_status_change: "/gupsup/messages/status" # when message status change like sent, received, read
    }
  end
end
