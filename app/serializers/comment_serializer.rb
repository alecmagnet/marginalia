class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :parent_comment_id 
  # :rating

  has_one :user
  has_one :lit_text
  has_one :parent_comment
end
