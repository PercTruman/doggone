class LostDogSerializer 
  include JSONAPI::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :breed, :color, :sex, :age_group, :image_url, :image, :additional_details, :contact_method, :contact_info, :sightings

  def image_url
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end
end
