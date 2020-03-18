class Itinerary
  attr_accessor :segment_ids, :pricing_information

  def initialize(itinerary_raw)
    @segment_ids = itinerary_raw['segment_ids']
    @pricing_information =  itinerary_raw['pricing_information']
  end

  def starts_with?(picked_segments_ids)
    valid = true
    picked_segments_ids.each_with_index do |picked_segment_id, idx|
      valid = false if picked_segment_id != @segment_ids[idx]
    end
    valid
  end

  def size
    @segment_ids.size
  end
end