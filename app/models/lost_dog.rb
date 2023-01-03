class LostDog < ApplicationRecord
    has_one_attached :image
    has_many :sightings
    has_many :users, through: :sightings

    validates :additional_details, length: { maximum: 250}


    def image_url
        Rails.application.routes.url_helpers.url_for(image) if image.attached?
    end
end
