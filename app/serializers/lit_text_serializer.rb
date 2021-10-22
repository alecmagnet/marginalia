class LitTextSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :first_name, :last_name, :author_name, :pubdate, :prose, :content, :fam_name_first, :translator, :created_at, :updated_at, :uploader_id
  has_many :comments
  has_many :users
  belongs_to :uploader
  belongs_to :edit_user

  def author_name
    object.fam_name_first ? "#{object.last_name} #{object.first_name}" : "#{object.first_name} #{object.last_name}"
  end
end
