class ComType < ApplicationRecord
  has_many :comment_com_types
  has_many :comments, through: :comment_com_types
end
