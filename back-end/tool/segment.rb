require 'json'
require 'pry'

class Segment
  attr_accessor :airlines, :arrival_time, :departure_time, :duration, :flight_numbers, :from, :price, :stops, :to, :zid

  def initialize(segment_data, flights_flights_data, filtered_itineraries, picked_segments_ids)
    sum_of_current_ids = [picked_segments_ids, segment_data['zid']].flatten
    possible_itineraries_of_this_segment = filter_itineraries_starting_with(flights_flights_data['itineraries'], sum_of_current_ids)

    @zid = segment_data['zid']
    @from = segment_departure_airport(flights_flights_data, segment_data)['address']['city_name']
    @to = segment_arrival_airport(flights_flights_data, segment_data)['address']['city_name']
    @duration = segment_data['duration']
    @departure_time = segment_data['legs'][0]['flight_time_range']['from']
    @arrival_time = (segment_data['legs'].last)['flight_time_range']['to']
    @airlines = segment_airlines(flights_flights_data, segment_data)
    @stops = segment_data['legs'].size - 1
    @flight_numbers = segment_data['legs'].map { |leg| leg['flight_number'] }
    @price = segment_price(possible_itineraries_of_this_segment, filtered_itineraries, picked_segments_ids)
  end

  def to_json_string
    hash = {}
    self.instance_variables.each do |instance_var|
      var_name = instance_var.to_s.delete('@')
      hash[var_name] = self.instance_variable_get instance_var
    end
    hash.to_json
  end

  def to_parsed_json
    JSON.parse(self.to_json_string)
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
end