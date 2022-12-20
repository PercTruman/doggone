class RemoveContactMethodContactFinderAndAdditionalDetailsFromLostDogs < ActiveRecord::Migration[6.1]
  def change
    remove_column :lost_dogs, :contact_method
    remove_column :lost_dogs, :contact_finder
    remove_column :lost_dogs, :additional_details
  end
end
