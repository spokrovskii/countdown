class User < ActiveRecord::Base
  validates :first_name, presence: true
  validates :last_name, presence: true
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :omniauthable, omniauth_providers: [:oktaoauth]
  has_many :goals, dependent: :destroy
  has_many :subtasks, dependent: :destroy

  validates :email, presence: true

  def self.from_omniauth(auth)
    user = User.find_or_create_by(email: auth["info"]["email"]) do |user|
      user.provider = auth['provider']
      user.uid= auth['uid']
      user.email = auth['info']['email']
    end 
  end 
  
  def can_modify?(item)
    id == item.user_id
  end
end
