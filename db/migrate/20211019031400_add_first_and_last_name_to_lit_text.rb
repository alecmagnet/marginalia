class AddFirstAndLastNameToLitText < ActiveRecord::Migration[6.1]
  def change
    add_column :lit_texts, :first_name, :string
    add_column :lit_texts, :last_name, :string
  end
end
