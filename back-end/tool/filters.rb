def filter_segments_by_list_of_amounts_of_stops(data, segments, amounts_list)
  params_list = if_it_is_not_a_list_convert_to_list(amounts_list)
  filtered_segments = params_list.map { |amount| filter_segments_by_amount_of_stop(data, segments, amount) }
  filtered_segments.flatten.uniq
end

def filter_segments_by_amount_of_stop(data, segments, amount)
  amount = amount.to_i
  if amount >= 2
    segments.select { |segment| data["shop_response_segments"][segment[:zid]]["legs"].size - 1 >= 2 }
  else
    segments.select { |segment| data["shop_response_segments"][segment[:zid]]["legs"].size - 1 == amount }
  end
end

def filter_segments_by_list_of_airlines(data, segments, airlines_name_list)
  params_list = if_it_is_not_a_list_convert_to_list(airlines_name_list)
  filtered_segments = params_list.map { |airline_name| filter_segments_by_airline(data, segments, airline_name) }
  filtered_segments.flatten.uniq
end

def filter_segments_by_airline(data, segments, airline_name)
  segments.select do |segment|
    segment[:airlines].include?(airline_name)
  end
end

def filter_segments_by_price_range(data, segments, range_list)
  segments.select do |segment|
    segment[:price].between?(range_list[0].to_i, range_list[1].to_i)
  end
end

def filter_segments_by_duration_range(data, segments, range_list)
  min = ISO8601::Duration.new(range_list[0])
  max = ISO8601::Duration.new(range_list[1])
  segments.select do |segment|
    ISO8601::Duration.new(segment[:duration]).to_seconds.between?(min.to_seconds, max.to_seconds)
  end
end

def filter_segments_by_list_of_flights_number(data, segments, flights_number_list)
  params_list = if_it_is_not_a_list_convert_to_list(flights_number_list)
  filtered_segments = params_list.map { |flight_number| filter_segments_by_flight_number(data, segments, flight_number) }
  filtered_segments.flatten.uniq
end

def filter_segments_by_flight_number(data, segments, flight_number)
  segments.select do |segment|
    segment[:flight_numbers].include?(flight_number)
  end
end
