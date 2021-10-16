class LitTextSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :pubdate, :prose, :content, :overflow, :rating, :description, :created_at
  has_many :comments
  has_many :users
end
