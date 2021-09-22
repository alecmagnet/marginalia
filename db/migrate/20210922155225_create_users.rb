class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :fullname
      t.string :image  
      t.date :birthdate
      t.text :bio
      t.string :user_type

      t.timestamps
    end
  end
end
