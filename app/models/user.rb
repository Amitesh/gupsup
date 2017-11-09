class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :conversations, :foreign_key => :sender_id

  # These are just dummy functions to provide avatar. It should be removed for live version.
  def avatar
    {
      big: "/images/avatars/" + (self.id % 10).to_s + "-big.png",
      small: "/images/avatars/" + (self.id % 10).to_s + "-small.png"
    }
  end
end
