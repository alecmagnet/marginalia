class LitTextSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :pubdate, :content, :overflow, :rating, :description
end
