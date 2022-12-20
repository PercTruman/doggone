class ChangeColumnMethodToContactMethod < ActiveRecord::Migration[6.1]
  def change
    remove_column :sightings, :method
    add_column :sightings, :contact_method, :string
  end
end
