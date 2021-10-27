class LitText < ApplicationRecord
	
	has_many :comments
	has_many :users, through: :comments	
	belongs_to :uploader, class_name: 'User'
	has_one :edit_user, class_name: 'User'
	# IF YOU NEED TO TEST ERRORS, THIS WILL CAUSE THE FETCH TO BE REJECTED:
	# belongs_to :edit_user, class_name: 'User'
end
