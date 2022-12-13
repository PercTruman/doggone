class Sighting < ApplicationRecord
    belongs_to :lost_dog
    belongs_to :user
end
