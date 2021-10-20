class AddFamNameFirstToLitText < ActiveRecord::Migration[6.1]
  def change
    add_column :lit_texts, :fam_name_first, :boolean
    add_column :lit_texts, :translator, :string
  end
end
