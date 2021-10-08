class LitTextSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :pubdate, :content, :overflow, :rating, :description, :created_at
  has_many :comments
  has_many :users
end
