class AddLatitudeAndLongitudeToSighting < ActiveRecord::Migration[6.1]
  def change
    add_column :sightings, :latitude, :float
    add_column :sightings, :longitude, :float
  end
end
