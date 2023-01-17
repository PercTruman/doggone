class AddOwnerIdToSightings < ActiveRecord::Migration[6.1]
  def change
    add_column :sightings, :owner_id, :string

  end
end
