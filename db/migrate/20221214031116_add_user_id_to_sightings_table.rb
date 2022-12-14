class AddUserIdToSightingsTable < ActiveRecord::Migration[6.1]
  def change
    add_column :sightings, :user_id, :integer
  end
end
