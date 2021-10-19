# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_10_19_031400) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "com_types", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "comment_com_types", force: :cascade do |t|
    t.bigint "comment_id", null: false
    t.bigint "com_type_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["com_type_id"], name: "index_comment_com_types_on_com_type_id"
    t.index ["comment_id"], name: "index_comment_com_types_on_comment_id"
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "lit_text_id", null: false
    t.bigint "parent_comment_id"
    t.text "content"
    t.integer "rating"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "deleted"
    t.index ["lit_text_id"], name: "index_comments_on_lit_text_id"
    t.index ["parent_comment_id"], name: "index_comments_on_parent_comment_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "lit_texts", force: :cascade do |t|
    t.string "title"
    t.string "author"
    t.integer "pubdate"
    t.text "content"
    t.text "overflow"
    t.integer "rating"
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "prose"
    t.string "first_name"
    t.string "last_name"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "fullname"
    t.string "image"
    t.text "bio"
    t.string "usertype"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "comment_com_types", "com_types"
  add_foreign_key "comment_com_types", "comments"
  add_foreign_key "comments", "comments", column: "parent_comment_id"
  add_foreign_key "comments", "lit_texts"
  add_foreign_key "comments", "users"
end
