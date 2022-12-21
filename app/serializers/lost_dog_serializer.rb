class LostDogSerializer
  include JSONAPI::Serializer

  attributes :id, :breed, :color, :sex, :age_group, :image_url
  has_many :sightings

end
