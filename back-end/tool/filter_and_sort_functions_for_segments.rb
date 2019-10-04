#!/usr/bin/ruby

require 'iso8601'
require 'json'
require 'time'

def all_segments_in_position(data, itineraries, position)
  ret = []
  itineraries.each do |itinerary|
    ret << data['shop_response_segments'][itinerary['segment_ids'][position]]
  end
  ret.uniq
end

def filter_itineraries_starting_with(itineraries, picked_segments_ids)
  itineraries.select do |itinerary|
    valid = true
    picked_segments_ids.each_with_index do |picked_segment_id, idx|
      valid = false if picked_segment_id != itinerary['segment_ids'][idx]
    end
    valid
  end
end

def segment_departure_airport(data, segment)
  departure_airport_id = segment['legs'][0]['departure_airport_id']
  data['shop_response_airports'][departure_airport_id]
end

def segment_arrival_airport(data, segment)
  arrival_airport_id = segment['legs'][-1]['arrival_airport_id']
  data['shop_response_airports'][arrival_airport_id]
end

def get_segments(data, picked_segments_ids = [])
  segments = []
  filtered_itineraries = filter_itineraries_starting_with(data['itineraries'], picked_segments_ids)
  all_segments_in_position(data, filtered_itineraries, picked_segments_ids.length).each do |segment|
    segments << generate_flight_card(segment, data, filtered_itineraries, picked_segments_ids)
  end
  segments
end

def generate_flight_card(segment, data, filtered_itineraries, picked_segments_ids)
  sum_of_current_ids = [picked_segments_ids, segment['zid']].flatten
  possible_itineraries_of_this_segment = filter_itineraries_starting_with(data['itineraries'], sum_of_current_ids)
  {
      zid: segment['zid'],
      from: segment_departure_airport(data, segment)['address']['city_name'],
      to: segment_arrival_airport(data, segment)['address']['city_name'],
      duration: segment['duration'],
      departure_time: segment['legs'][0]['flight_time_range']['from'],
      arrival_time: (segment['legs'].last)['flight_time_range']['to'],
      airlines: segment_airlines(data, segment),
      stops: segment['legs'].size - 1,
      flight_numbers: segment['legs'].map { |leg| leg['flight_number'] },
      price: segment_price(possible_itineraries_of_this_segment, filtered_itineraries, picked_segments_ids)
  }
end

def segment_price(possible_itineraries_of_this_segment, filtered_itineraries, picked_segments_ids)
  if picked_segments_ids.size == 0
    return minimum_itinerary_price(possible_itineraries_of_this_segment)
  else
    return minimum_itinerary_price(possible_itineraries_of_this_segment) - minimum_itinerary_price(filtered_itineraries)
  end
end

def minimum_itinerary_price(itineraries)
  itinerary_prices = itineraries.map { |itinerary| define_price(itinerary) }
  itinerary_prices.min
end

def define_price(itinerary)
  itinerary['pricing_information'].each do |pi|
    if pi['fare_type'] == "PUB"
      return pi['total_price']['cents']
    end
  end
  return itinerary['pricing_information'].first['total_price']['cents']
end

def compare_segments_by_duration(segment_a, segment_b)
  duration_a = ISO8601::Duration.new(segment_a[:duration])
  duration_b = ISO8601::Duration.new(segment_b[:duration])
  duration_a.to_seconds <=> duration_b.to_seconds
end

def compare_segments_by_departure_date(segment_a, segment_b)
  departure_a = Time.parse(segment_a[:departure_time])
  departure_b = Time.parse(segment_b[:departure_time])
  departure_a <=> departure_b
end

def compare_segments_by_price(segment_a, segment_b)
  price_a = segment_a[:price]
  price_b = segment_b[:price]
  price_a <=> price_b
end

def compare_segments_by_arrival_date(segment_a, segment_b)
  arrival_a = Time.parse(segment_a[:arrival_time])
  arrival_b = Time.parse(segment_b[:arrival_time])
  arrival_a <=> arrival_b
end

def apply_filter_with_a_list_of_params(data, segments, filter_function, params_list)
  filtered_segments = []
  params_list.each do |amount|
    filtered_segments << filter_function(data, segments, amount)
  end
  filtered_segments.flatten.uniq
end

def if_it_is_not_a_list_convert_to_list(params)
  params_list = []
  params_list << params
  params_list.flatten
end

def filter_segments_by_list_of_amounts_of_stops(data, segments, amounts_list)
  params_list = if_it_is_not_a_list_convert_to_list(amounts_list)
  filtered_segments = params_list.map { |amount| filter_segments_by_amount_of_stop(data, segments, amount) }
  filtered_segments.flatten.uniq
end

def filter_segments_by_amount_of_stop(data, segments, amount)
  amount = amount.to_i
  if amount >= 2
    segments.select { |segment| data['shop_response_segments'][segment[:zid]]['legs'].size - 1 >= 2 }
  else
    segments.select { |segment| data['shop_response_segments'][segment[:zid]]['legs'].size - 1 == amount }
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

def filter_segments_by_arrival_range(segments, range_list)
  min =  Time.parse(range_list[0])
  max =  Time.parse(range_list[1])
  segments.select do |segment|
     Time.parse(segment[:arrival_time]).between?(min, max)
  end
end

def filter_segments_by_departure_range(segments, range_list)
  min =  Time.parse(range_list[0])
  max =  Time.parse(range_list[1])
  segments.select do |segment|
     Time.parse(segment[:departure_time]).between?(min, max)
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

def get_airlines(data, segments)
  get_airline_names(segments).map do |airline_name|
    {
        "name" => airline_name,
        "amount" => get_airline_amount(data, segments, airline_name)
    }
  end
end

def get_airline_names(segments)
  segments.map { |segment| segment[:airlines] }.flatten.uniq
end

def get_airline_amount(data, segments, airline_name)
  filter_segments_by_airline(data, segments, airline_name).size
end

def get_flight_numbers(segments)
  segments.map { |segment| segment[:flight_numbers] }.flatten.uniq
end

def get_stops_amounts(data, segments)
  zero_stops = filter_segments_by_amount_of_stop(data, segments, 0)
  one_stop = filter_segments_by_amount_of_stop(data, segments, 1)
  two_or_more_stops = filter_segments_by_amount_of_stop(data, segments, 2)
  return {"0 stop" => zero_stops.size,
          "1 stop" => one_stop.size,
          "2 or more stops" => two_or_more_stops.size}
end

def airline_codes(data, segment)
  airline_codes = []
  segment['legs'].each do |leg|
    airline_codes << leg['marketing_airline_code']
  end
  airline_codes
end

def itineraries_size(data)
  (data['itineraries'].first)['segment_ids'].size
end

def sort_by_lowest_price(segments)
  segments.sort(&method(:compare_segments_by_price))
end

def sort_by_highest_price(segments)
  segments.sort(&method(:compare_segments_by_price)).reverse

end

def get_prices(segments)
  segments.map { |segment| segment[:price] }.flatten.uniq
end

def get_durations(segments)
  segments.map { |segment| segment[:duration] }.flatten.uniq
end

def get_arrivals(segments)
  segments.map { |segment| segment[:arrival_time]}.flatten.uniq
end

def get_departures(segments)
  segments.map { |segment| segment[:departure_time]}.flatten.uniq
end

def lowest_duration(segments)
  if segments != ([]) then
    sort_by_shorter_duration(segments).first[:duration]
  end
end

def highest_duration(segments)
  if segments != ([]) then
    sort_by_shorter_duration(segments).last[:duration]
  end
end

def earliest_arrival(segments)
  if segments != ([]) then
    sort_by_first_arrival_date(segments).first[:arrival_time]
  end
end

def latest_arrival(segments)
  if segments != ([]) then
    sort_by_first_arrival_date(segments).last[:arrival_time]
  end
end

def earliest_departure(segments)
  if segments != ([]) then
    sort_by_first_departure_date(segments).first[:departure_time]
  end
end

def latest_departure(segments)
  if segments != ([]) then
    sort_by_first_departure_date(segments).last[:departure_time]
  end
end

def sort_by_shorter_duration(segments)
  segments.sort(&method(:compare_segments_by_duration))
end

def sort_by_first_departure_date(segments)
  segments.sort(&method(:compare_segments_by_departure_date))
end

def sort_by_first_arrival_date(segments)
  segments.sort(&method(:compare_segments_by_arrival_date))
end

def segment_airlines(data, segment)
  airline_codes(data, segment).map { |airline_code| data['shop_response_airlines'][airline_code]['name'] }
end

def apply_filters(data, segments, filters)
  filters.each_key do |filter_name|
    if filters[filter_name]["selected"] == true
      filter_params = filters[filter_name]
      segments = apply_filter(data, segments, filter_name, filter_params)
    end
  end
  return segments
end

def apply_filter(data, segments, filter_name, filter_params)
  case filter_name
  when "amount_of_stop"
    return filter_segments_by_list_of_amounts_of_stops(data, segments, filter_params["amount"])
  when "airlines"
    return filter_segments_by_list_of_airlines(data, segments, filter_params["airline_name"])
  when "price_range"
    return filter_segments_by_price_range(data, segments, filter_params["prices"])
  when "duration_range"
    return filter_segments_by_duration_range(data, segments, filter_params["durations"])
  when "arrival_range"
    return filter_segments_by_arrival_range(segments, filter_params["arrivals"])
  when "departure_range"
    return filter_segments_by_departure_range(segments, filter_params["departures"])
  when "flight_number"
    return filter_segments_by_list_of_flights_number(data, segments, filter_params["flight_number"])
  end
end

def apply_sort(segments, sort_type)
  case sort_type
  when "priceLowest"
    return sort_by_lowest_price(segments)
  when "priceHighest"
    return sort_by_highest_price(segments)
  when "durationShortest"
    return sort_by_shorter_duration(segments)
  when "durationLongest"
    return sort_by_shorter_duration(segments).reverse
  when "departureEarliest"
    return sort_by_first_departure_date(segments)
  when "departureLatest"
    return sort_by_first_departure_date(segments).reverse
  when "arrivalEarliest"
    return sort_by_first_arrival_date(segments)
  when "arrivalLatest"
    return sort_by_first_arrival_date(segments).reverse
  end
end
