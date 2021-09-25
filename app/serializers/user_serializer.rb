class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :fullname, :image, :bio, :created_at 
  # , :usertype
  has_many :comments
end
