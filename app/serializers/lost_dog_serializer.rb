class LostDogSerializer < ActiveModel::Serializer
  include JSONAPI::Serializer
  attributes :id, :breed, :color, :sex, :age_group, :image, :image_url, :created_at, :additional_details

end
