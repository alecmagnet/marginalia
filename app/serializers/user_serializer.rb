class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :first_name, :last_name, :name, :fam_name_first, :image, :bio, :usertype, :created_at 

  has_many :comments

  def name
    object.fam_name_first ? "#{object.last_name} #{object.first_name}" : "#{object.first_name} #{object.last_name}"
  end
end
