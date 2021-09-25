class Comment < ApplicationRecord
  has_many :replies, class_name: "Comment", foreign_key: "parent_comment_id"
  belongs_to :user
  belongs_to :lit_text
  belongs_to :parent_comment, class_name: "Comment", optional: true
end
