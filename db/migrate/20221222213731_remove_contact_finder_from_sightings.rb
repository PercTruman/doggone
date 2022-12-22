class RemoveContactFinderFromSightings < ActiveRecord::Migration[6.1]
  def change
    remove_column :sightings, :contact_finder

  end
end
