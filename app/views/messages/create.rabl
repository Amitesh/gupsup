object @message
attributes :id, :content, :status, :origin, :conversation_id

node(:conversation) do 
  c = {
    id:           @message.conversation_id,
    sender_id:    @conversation.sender_id,
    recipient_id: @conversation.recipient_id
  }
end

node(:sent_at) do 
  @message.created_at.utc.iso8601()
end

node(:sender_id) do 
  @message.user_id
end

node(:name) do 
  @message.sender.name
end

node(:avatar) do
  (@message.sender.avatar)[:big]
end