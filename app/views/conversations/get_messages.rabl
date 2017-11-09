object @conversation
attributes :id, :sender_id, :recipient_id

node :messages do 
  formated_msg = []
  @conversation.messages.each do |msg|
    obj = {}
    
    obj[:id]              = msg.id
    obj[:content]         = msg.content
    obj[:status]          = msg.status
    obj[:origin]          = msg.origin
    obj[:conversation_id] = msg.conversation_id
    obj[:sent_at]         = msg.created_at.utc.iso8601()
    obj[:sender_id]       = msg.user_id
    obj[:name]            = msg.sender.name
    obj[:avatar]          = (msg.sender.avatar)[:big]

    formated_msg << obj
  end

  formated_msg
end

