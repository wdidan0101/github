class Poet
  
  include Mongoid::Document
  
  field :name, type: String  
  field :origin, type: String

  has_many :poems
end
