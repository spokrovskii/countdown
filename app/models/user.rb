class User < ActiveRecord::Base
  validates :first_name, presence: true
  validates :last_name, presence: true
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :goals, dependent: :destroy
  has_many :subtasks, dependent: :destroy

  validates :email, presence: true

  def can_modify?(item)
    id == item.user_id
  end
end
