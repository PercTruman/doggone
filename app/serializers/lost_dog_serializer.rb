class LostDogSerializer < ActiveModel::Serializer
  attributes :id, :breed, :color, :sex, :age_group, :image, :additional_details
  include Rails.application.routes.url_helpers
end
