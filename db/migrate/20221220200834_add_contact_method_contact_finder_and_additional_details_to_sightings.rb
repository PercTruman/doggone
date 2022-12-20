class AddContactMethodContactFinderAndAdditionalDetailsToSightings < ActiveRecord::Migration[6.1]
  def change
    add_column :sightings, :contact_finder, :boolean
    add_column :sightings, :method, :string
    add_column :sightings, :additional_details, :string
  end
end
