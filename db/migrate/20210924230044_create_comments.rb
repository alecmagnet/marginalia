class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :lit_text, null: false, foreign_key: true
      t.belongs_to :parent_comment, foreign_key: { to_table: :comments }
      t.text :content
      t.integer :rating

      t.timestamps
    end
  end
end
