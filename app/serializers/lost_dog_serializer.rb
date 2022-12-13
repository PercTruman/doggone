class LostDogSerializer
  include JSONAPI::Serializer
  attributes :id, :breed, :color, :sex, :age_group, :additional_details, :contact_method, :contact_finder, :image_url
end
