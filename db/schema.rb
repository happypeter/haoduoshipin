# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140113122015) do

  create_table "comments", :force => true do |t|
    t.integer  "episode_id"
    t.text     "content"
    t.string   "name"
    t.string   "email"
    t.integer  "user_id"
    t.string   "ancestry"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "episodes", :force => true do |t|
    t.string   "name"
    t.datetime "created_at",                    :null => false
    t.datetime "updated_at",                    :null => false
    t.text     "notes"
    t.datetime "published_at"
    t.integer  "seconds"
    t.text     "description"
    t.integer  "comments_count", :default => 0, :null => false
    t.string   "youku"
    t.float    "ratio"
    t.integer  "revision"
  end

  create_table "notifications", :force => true do |t|
    t.integer  "user_id"
    t.integer  "comment_id"
    t.boolean  "unread",     :default => true
    t.datetime "created_at",                   :null => false
    t.datetime "updated_at",                   :null => false
  end

  create_table "taggings", :force => true do |t|
    t.integer  "episode_id"
    t.integer  "tag_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "tags", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "users", :force => true do |t|
    t.datetime "created_at",                               :null => false
    t.datetime "updated_at",                               :null => false
    t.string   "name"
    t.string   "email"
    t.string   "password_hash"
    t.string   "password_salt"
    t.string   "token"
    t.string   "github_username"
    t.string   "site_url"
    t.string   "gravatar_token"
    t.string   "github_uid"
    t.boolean  "show_email",             :default => true
    t.boolean  "admin"
    t.string   "password_reset_token"
    t.datetime "password_reset_sent_at"
    t.boolean  "email_subscription",     :default => true
    t.string   "google_uid"
    t.string   "google_username"
    t.string   "profile_url"
  end

end
