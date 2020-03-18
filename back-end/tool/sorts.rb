module Sorts
  def apply_sort(segments, sort_type)
    case sort_type
    when "priceLowest"
      return sort_segments_by(segments, :compare_segments_by_price)
    when "priceHighest"
      return sort_segments_by(segments, :compare_segments_by_price).reverse
    when "durationShortest"
      return sort_segments_by(segments, :compare_segments_by_duration)
    when "durationLongest"
      return sort_segments_by(segments, :compare_segments_by_duration).reverse
    when "departureEarliest"
      return sort_segments_by(segments, :compare_segments_by_departure_date)
    when "departureLatest"
      return sort_segments_by(segments, :compare_segments_by_departure_date).reverse
    when "arrivalEarliest"
      return sort_segments_by(segments, :compare_segments_by_arrival_date)
    when "arrivalLatest"
      return sort_segments_by(segments, :compare_segments_by_arrival_date).reverse
    end
  end

  def sort_segments_by(segments, criterion)
    segments.sort(&method(criterion))
  end
  def define_compare_criterion(attribute)
    case attribute
    when :duration
      return :compare_segments_by_duration
    when :arrival_time
      return :compare_segments_by_arrival_date
    when :departure_time
      return :compare_segments_by_departure_date
    end
  end

  def compare_segments_by_duration(segment_a, segment_b)
    duration_a = ISO8601::Duration.new(segment_a.duration)
    duration_b = ISO8601::Duration.new(segment_b.duration)
    duration_a.to_seconds <=> duration_b.to_seconds
  end

  def compare_segments_by_departure_date(segment_a, segment_b)
    departure_a = Time.parse(segment_a.departure_time)
    departure_b = Time.parse(segment_b.departure_time)
    departure_a <=> departure_b
  end

  def compare_segments_by_price(segment_a, segment_b)
    price_a = segment_a.price
    price_b = segment_b.price
    price_a <=> price_b
  end

  def compare_segments_by_arrival_date(segment_a, segment_b)
    arrival_a = Time.parse(segment_a.arrival_time)
    arrival_b = Time.parse(segment_b.arrival_time)
    arrival_a <=> arrival_b
  end
end