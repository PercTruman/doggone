class RemoveIsOwnerAndIsFinderFromUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :isOwner
    remove_column :users, :isFinder
  end
end
