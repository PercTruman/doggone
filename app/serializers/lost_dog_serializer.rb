class LostDogSerializer
  include JSONAPI::Serializer
  has_many :sightings
  attributes :id, :breed, :color, :sex, :age_group, :additional_details, :contact_method, :contact_finder, :image, :image_url

end
