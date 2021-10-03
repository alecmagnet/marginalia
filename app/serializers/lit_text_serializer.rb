class LitTextSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :pubdate, :content, :overflow, :rating, :description
  has_many :comments
  has_many :users
end
