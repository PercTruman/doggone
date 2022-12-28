class AddContactInfoToSightings < ActiveRecord::Migration[6.1]
  def change
    add_column :sightings, :contact_info, :string
  end
end
