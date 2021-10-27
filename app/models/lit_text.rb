class LitText < ApplicationRecord
	# validates :title, presence: true
	# validates :first_name, presence: true
	# validates :last_name, presence: true
	# validates :fam_name_first, presence: true	
	# validates :pubdate, presence: true
	# validates :content, presence: true
	# validates :prose, presence: true

	
	has_many :comments
	has_many :users, through: :comments	
	belongs_to :uploader, class_name: 'User'
	has_one :edit_user, class_name: 'User'
end
