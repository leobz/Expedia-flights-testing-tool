#!/usr/bin/ruby

require 'iso8601'
require 'json'
require 'time'
require_relative 'segment.rb'
require_relative 'itinerary.rb'
require_relative 'filters.rb'
require_relative 'sorts'
include Filters
include Sorts

def get_segments(flights_flights_data, picked_segments_ids = [])
  segments = []
  itineraries = []
  flights_flights_data['itineraries']. each do |itinerary_raw|
    itineraries << Itinerary.new(itinerary_raw)
  end
  filtered_itineraries = filter_itineraries_starting_with(itineraries, picked_segments_ids)
  all_segments_in_position(flights_flights_data, filtered_itineraries, picked_segments_ids.length).each do |segment|
    segments << Segment.new(segment, flights_flights_data, filtered_itineraries, picked_segments_ids)
  end
  segments
end

def filter_itineraries_starting_with(itineraries, picked_segments_ids)
  itineraries.select do |itinerary|
    itinerary.starts_with?(picked_segments_ids)
  end
end

def all_segments_in_position(flights_data, itineraries, position)
  ret = []
  itineraries.each do |itinerary|
    ret << flights_data['shop_response_segments'][itinerary.segment_ids[position]]
  end
  ret.uniq
end

def itineraries_size(flights_data)
  (flights_data['itineraries'].first)['segment_ids'].size
end



# GETTERS

def get(segments, attribute)
  segments.map { |segment| segment.send(attribute) }.flatten.uniq
end

def get_airline_amount(segments, airline_name)
  filter_segments_by_airline(segments, airline_name).size
end

def get_flight_numbers(segments)
  segments.map { |segment| segment.flight_numbers }.flatten.uniq
end

def get_stops_amounts(flights_data, segments)
  zero_stops = filter_segments_by_amount_of_stop(flights_data, segments, 0)
  one_stop = filter_segments_by_amount_of_stop(flights_data, segments, 1)
  two_or_more_stops = filter_segments_by_amount_of_stop(flights_data, segments, 2)
  return {"0 stop" => zero_stops.size,
          "1 stop" => one_stop.size,
          "2 or more stops" => two_or_more_stops.size}
end

def get_airlines(segments)
  get(segments, :airlines ).map do |airline_name|
    {
      "name" => airline_name,
      "amount" => get_airline_amount(segments, airline_name)
    }
  end
end

def min(segments, attribute)
  if segments != ([]) then
    criterion = define_compare_criterion(attribute)
    sort_segments_by(segments, criterion).first.send(attribute)
  end
end

def max(segments, attribute)
  if segments != ([]) then
    criterion = define_compare_criterion(attribute)
    sort_segments_by(segments, criterion).last.send(attribute)
  end
end

