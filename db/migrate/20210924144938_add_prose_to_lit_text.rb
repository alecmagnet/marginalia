class AddProseToLitText < ActiveRecord::Migration[6.1]
  def change
    add_column :lit_texts, :prose, :boolean
  end
end
