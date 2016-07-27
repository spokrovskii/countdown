class User < ActiveRecord::Base
  validates :first_name, presence: true
  validates :last_name, presence: true
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :goals, dependent: :destroy

  validates :email, presence: true

  def admin?
    role == 'admin'
  end

  def can_modify?(item)
    admin? || id == item.user_id
  end
end
