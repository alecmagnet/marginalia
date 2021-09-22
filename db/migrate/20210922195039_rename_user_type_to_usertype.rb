class RenameUserTypeToUsertype < ActiveRecord::Migration[6.1]
  def change
    rename_column :users, :user_type, :usertype
  end
end
