class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :email
      t.string :username
      t.string :password_digest
      t.integer :phone_number
      t.integer :dog_id
      t.boolean :isOwner
      t.boolean :isFinder

      t.timestamps
    end
  end
end
