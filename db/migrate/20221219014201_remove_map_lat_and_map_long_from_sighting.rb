class RemoveMapLatAndMapLongFromSighting < ActiveRecord::Migration[6.1]
  def change
    remove_column :sightings, :map_lat
    remove_column :sightings, :map_lng
  end
end
