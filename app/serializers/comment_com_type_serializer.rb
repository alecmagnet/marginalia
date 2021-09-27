class CommentComTypeSerializer < ActiveModel::Serializer
  attributes :id
  has_one :comment
  has_one :com_type
end
