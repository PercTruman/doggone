class CreateSightings < ActiveRecord::Migration[6.1]
  def change
    create_table :sightings do |t|
      t.integer :dog_id
      t.integer :lost_dog_id
      t.integer :owner_id
      t.integer :finder_id
      t.string :map_lat
      t.string :map_lng
      t.boolean :contact_finder
      t.string :contact_method

      t.timestamps
    end
  end
end
