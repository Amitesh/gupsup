class MessagesController < ApplicationController
  before_filter :authenticate_user!

  def create
    @conversation    = Conversation.find(params[:conversation_id])
    @message         = @conversation.messages.build(message_params)
    @message.user_id = current_user.id
    @message.save!

    json_data = render_message_data
    
    # Publish to faye server to push to all connected clients
    PrivatePub.publish_to Message.channels[:new_message], :data => json_data

    render json: json_data
  end

  def update_status
    message_ids     = params[:message_ids]
    status          = params[:status]
    conversation_id = params[:conversation_id]
    if(message_ids.present?)
      messages = Message.find_by(:id => message_ids, :conversation_id => conversation_id)
      messages.update({status: status})
    end

    json_data = {message_ids: message_ids.to_json, status: status}

    # Publish to faye server to push to all connected clients
    PrivatePub.publish_to Message.channels[:message_status_change], :data => json_data

    render json: json_data
  end

  private

  def message_params
    params.require(:message).permit(:content, :origin)
  end

  def render_message_data
    message  = Rabl.render(@message, 'messages/create', 
      :locals => { :current_user => current_user, :conversation => @conversation },
      :view_path => 'app/views', 
      :format => :json)
  end
end
