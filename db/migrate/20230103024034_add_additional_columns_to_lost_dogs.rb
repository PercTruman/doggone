class AddAdditionalColumnsToLostDogs < ActiveRecord::Migration[6.1]
  def change
    add_column :lost_dogs, :additional_details, :string
    add_column :lost_dogs, :contact_method, :string
    add_column :lost_dogs, :contact_info, :string
  end
end
