class UsersController < ApplicationController
  before_filter :authenticate_user!

  # TODO : Create a buddy list by inviting friends. To keep it simple, all users are buddy of each other.
  # 
  def my_buddy_list
    @users = User.where("id != ?", current_user.id).order("created_at")
  end
end
