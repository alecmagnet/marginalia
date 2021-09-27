class Comment < ApplicationRecord
  has_many :replies, class_name: "Comment", foreign_key: "parent_comment_id"
  has_many :comment_com_types
  has_many :com_types, through: :comment_com_types
  belongs_to :user
  belongs_to :lit_text
  belongs_to :parent_comment, class_name: "Comment", optional: true
end
