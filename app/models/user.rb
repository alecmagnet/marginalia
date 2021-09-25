class User < ApplicationRecord
  has_secure_password

	validates :username, presence: true, uniqueness: true
	validates :fullname, presence: true

  has_many :comments
	has_many :lit_texts, through: :comments	
end
