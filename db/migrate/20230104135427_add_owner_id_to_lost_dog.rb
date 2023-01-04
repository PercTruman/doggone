class AddOwnerIdToLostDog < ActiveRecord::Migration[6.1]
  def change
    add_column :lost_dogs, :owner_id, :string
  end
end
