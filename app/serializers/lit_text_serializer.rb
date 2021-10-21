class LitTextSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :first_name, :last_name, :pubdate, :prose, :content, :fam_name_first, :translator, :created_at, :updated_at, :uploader_id
  has_many :comments
  has_many :users
  belongs_to :uploader
  belongs_to :edit_user
end
