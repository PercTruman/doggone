class ChangeTitleToSubjectAndBodyToContent < ActiveRecord::Migration[6.1]
  def change
    remove_column :posts, :title
    add_column :posts, :subject, :string
    remove_column :posts, :body
    add_column :posts, :content, :string
  end
end
