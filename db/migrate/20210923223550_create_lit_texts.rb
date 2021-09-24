class CreateLitTexts < ActiveRecord::Migration[6.1]
  def change
    create_table :lit_texts do |t|
      t.string :title
      t.string :author
      t.integer :pubdate
      t.text :content
      t.text :overflow
      t.integer :rating
      t.text :description

      t.timestamps
    end
  end
end
