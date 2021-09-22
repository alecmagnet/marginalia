class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :fullname, :image, :birthdate, :bio 
  # , :usertype
  
end
