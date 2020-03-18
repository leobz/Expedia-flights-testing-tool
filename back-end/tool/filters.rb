module Filters
  def apply_filters(flights_data, segments, filters)
    filters.each_key do |filter_name|
      if filters[filter_name]["selected"] == true
        filter_params = filters[filter_name]
        segments = apply_filter(flights_data, segments, filter_name, filter_params)
      end
    end
    return segments
  end

  def apply_filter(flights_data, segments, filter_name, filter_params)
    case filter_name
    when "amount_of_stop"
      return filter_segments_by_list_of_amounts_of_stops(flights_data, segments, filter_params["amount"])
    when "airlines"
      return filter_segments_by_list_of_airlines(segments, filter_params["airline_name"])
    when "price_range"
      return filter_segments_by_price_range(segments, filter_params["prices"])
    when "duration_range"
      return filter_segments_by_duration_range(segments, filter_params["durations"])
    when "arrival_range"
      return filter_segments_by_arrival_range(segments, filter_params["arrivals"])
    when "departure_range"
      return filter_segments_by_departure_range(segments, filter_params["departures"])
    when "flight_number"
      return filter_segments_by_list_of_flights_number(flights_data, segments, filter_params["flight_number"])
    end
  end


  def filter_segments_by_list_of_amounts_of_stops(flights_flights_data, segments, amounts_list)
    params_list = ensure_a_list(amounts_list)
    filtered_segments = params_list.map { |amount| filter_segments_by_amount_of_stop(flights_flights_data, segments, amount) }
    filtered_segments.flatten.uniq
  end

  def filter_segments_by_amount_of_stop(flights_flights_data, segments, amount)
    amount = amount.to_i
    if amount >= 2
      segments.select { |segment| flights_flights_data['shop_response_segments'][segment.zid]['legs'].size - 1 >= 2 }
    else
      segments.select { |segment| flights_flights_data['shop_response_segments'][segment.zid]['legs'].size - 1 == amount }
    end
  end

  def filter_segments_by_list_of_airlines(segments, airlines_name_list)
    params_list = ensure_a_list(airlines_name_list)
    filtered_segments = params_list.map { |airline_name| filter_segments_by_airline(segments, airline_name) }
    filtered_segments.flatten.uniq
  end

  def filter_segments_by_airline(segments, airline_name)
    segments.select do |segment|
      segment.include_airline?(airline_name)
    end
  end

  def filter_segments_by_price_range(segments, range_list)
    segments.select do |segment|
      segment.price.between?(range_list[0].to_i, range_list[1].to_i)
    end
  end

  def filter_segments_by_duration_range(segments, range_list)
    min = ISO8601::Duration.new(range_list[0])
    max = ISO8601::Duration.new(range_list[1])
    segments.select do |segment|
      ISO8601::Duration.new(segment.duration).to_seconds.between?(min.to_seconds, max.to_seconds)
    end
  end

  def filter_segments_by_arrival_range(segments, range_list)
    min =  Time.parse(range_list[0])
    max =  Time.parse(range_list[1])
    segments.select do |segment|
      Time.parse(segment.arrival_time).between?(min, max)
    end
  end

  def filter_segments_by_departure_range(segments, range_list)
    min =  Time.parse(range_list[0])
    max =  Time.parse(range_list[1])
    segments.select do |segment|
      Time.parse(segment.departure_time).between?(min, max)
    end
  end

  def filter_segments_by_list_of_flights_number(flights_flights_data, segments, flights_number_list)
    params_list = ensure_a_list(flights_number_list)
    filtered_segments = params_list.map { |flight_number| filter_segments_by_flight_number(flights_flights_data, segments, flight_number) }
    filtered_segments.flatten.uniq
  end

  def filter_segments_by_flight_number(flights_data, segments, flight_number)
    segments.select do |segment|
      segment.flight_numbers.include?(flight_number)
    end
  end

  def ensure_a_list(params)
    if params.kind_of?(Array)
      return params.flatten
    else
      return [params]
    end
  end
end
