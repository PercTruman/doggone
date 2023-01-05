class ChangeAuthorIdToJustAuthorOnPosts < ActiveRecord::Migration[6.1]
  def change
    remove_column :posts, :author_id
    add_column :posts, :author, :string
  end
end
