class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :parent_comment_id, :created_at, :updated_at, :user_id, :lit_text_id, :deleted 
  # :rating

  has_one :user
  has_one :lit_text
  has_one :parent_comment
  has_many :replies
  has_many :com_types
end
