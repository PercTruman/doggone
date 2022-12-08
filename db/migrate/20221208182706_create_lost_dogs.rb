class CreateLostDogs < ActiveRecord::Migration[6.1]
  def change
    create_table :lost_dogs do |t|
      t.string :breed
      t.string :color
      t.string :sex
      t.string :age_group
      t.string :additional_details

      t.timestamps
    end
  end
end
