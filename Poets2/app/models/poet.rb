class Poet
  
  include Mongoid::Document
  
  field :name, type: String  
  field :origin, type: String

end
