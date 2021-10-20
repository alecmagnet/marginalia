class LitTextSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :first_name, :last_name, :pubdate, :prose, :content, :fam_name_first, :translator, :created_at, :updated_at
  has_many :comments
  has_many :users
end
