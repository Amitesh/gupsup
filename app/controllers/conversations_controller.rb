class ConversationsController < ApplicationController
  before_filter :authenticate_user!

  # Get the previous conversation or create one
  # Find all messages between sender and recipients
  def get_messages
    if Conversation.previous_talks(params[:sender_id],params[:recipient_id]).present?
      @conversation = Conversation.previous_talks(params[:sender_id],params[:recipient_id]).first
    else
      @conversation = Conversation.create!(conversation_params)
    end
  end


  private
  def conversation_params
    params.permit(:sender_id, :recipient_id)
  end

end
