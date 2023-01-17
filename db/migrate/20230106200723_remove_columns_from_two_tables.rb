class RemoveColumnsFromTwoTables < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :dog_id
    remove_column :sightings, :dog_id
    remove_column :sightings, :finder_id
    remove_column :sightings, :owner_id
  end
end
