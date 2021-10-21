class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :first_name, :last_name, :fam_name_first, :image, :bio, :created_at 
  # , :usertype
  has_many :comments
end
