class RemoveContactMethodAndContactFinderFromSightingsTable < ActiveRecord::Migration[6.1]
  def change
    remove_column :sightings, :contact_method
    remove_column :sightings, :contact_finder
  end
end
