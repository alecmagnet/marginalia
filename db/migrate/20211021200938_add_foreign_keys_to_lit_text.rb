class AddForeignKeysToLitText < ActiveRecord::Migration[6.1]
  def change
    add_reference :lit_texts, :uploader, foreign_key: { to_table: :users }
    add_reference :lit_texts, :edit_user, foreign_key: { to_table: :users }
  end
end
