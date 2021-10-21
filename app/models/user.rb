class User < ApplicationRecord
  has_secure_password

	validates :username, presence: true, uniqueness: true
	validates :first_name, presence: true
	validates :last_name, presence: true

  has_many :comments
	has_many :lit_texts, through: :comments
	has_many :uploaded_texts, class_name: :LitText, foreign_key: 'uploader' 
	has_many :edited_texts, class_name: :LitText, foreign_key: 'edit_user' 
end
