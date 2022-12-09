class AddContactMethodAndContactFinderToCreateLostDogs < ActiveRecord::Migration[6.1]
  def change
    add_column :lost_dogs, :contact_method, :string
    add_column :lost_dogs, :contact_finder, :boolean
  end
end
