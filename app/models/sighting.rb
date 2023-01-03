class Sighting < ApplicationRecord
    belongs_to :lost_dog
    belongs_to :user

    validates :lost_dog_id, presence: true
    validates :latitude, presence: true, uniqueness: true
    validates :longitude, presence: true, uniqueness: true
    

   
end
