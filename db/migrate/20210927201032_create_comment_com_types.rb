class CreateCommentComTypes < ActiveRecord::Migration[6.1]
  def change
    create_table :comment_com_types do |t|
      t.belongs_to :comment, null: false, foreign_key: true
      t.belongs_to :com_type, null: false, foreign_key: true

      t.timestamps
    end
  end
end
