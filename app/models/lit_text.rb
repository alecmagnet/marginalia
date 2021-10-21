class LitText < ApplicationRecord
	# validates :title, presence: true
	# validates :author, presence: true
	# validates :pubdate, presence: true
	# validates :content, presence: true
	# validates :prose, presence: true

	
	has_many :comments
	has_many :users, through: :comments	
	belongs_to :uploader, class_name: 'User'
	belongs_to :edit_user, class_name: 'User'
end
