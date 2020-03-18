require 'json'
require 'pry'

class Segment
  attr_accessor :airlines, :arrival_time, :departure_time, :duration, :flight_numbers, :from, :price, :stops, :to, :zid

  def initialize(segment_data, flights_flights_data, filtered_itineraries, picked_segments_ids)
    itineraries = []
    flights_flights_data['itineraries']. each do |itinerary_raw|
      itineraries << Itinerary.new(itinerary_raw)
    end
    sum_of_current_ids = [picked_segments_ids, segment_data['zid']].flatten
    possible_itineraries_of_this_segment = filter_itineraries_starting_with(itineraries, sum_of_current_ids)

    @zid = segment_data['zid']
    @from = departure_airport(flights_flights_data, segment_data)['address']['city_name']
    @to = arrival_airport(flights_flights_data, segment_data)['address']['city_name']
    @duration = segment_data['duration']
    @departure_time = segment_data['legs'][0]['flight_time_range']['from']
    @arrival_time = (segment_data['legs'].last)['flight_time_range']['to']
    @airlines = segment_airlines(flights_flights_data, segment_data)
    @stops = segment_data['legs'].size - 1
    @flight_numbers = segment_data['legs'].map { |leg| leg['flight_number'] }
    @price = segment_price(possible_itineraries_of_this_segment, filtered_itineraries, picked_segments_ids)
  end

  def departure_airport(flights_data, segment)
    departure_airport_id = segment['legs'][0]['departure_airport_id']
    flights_data['shop_response_airports'][departure_airport_id]
  end
  
  def arrival_airport(flights_data, segment)
    arrival_airport_id = segment['legs'][-1]['arrival_airport_id']
    flights_data['shop_response_airports'][arrival_airport_id]
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
    itinerary.pricing_information.each do |pi|
      if pi['fare_type'] == "PUB"
        return pi['total_price']['cents']
      end
    end
    return itinerary.pricing_information.first['total_price']['cents']
  end

  def include_airline?(airline_name)
    self.airlines.include?(airline_name)
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
      itinerary.starts_with?(picked_segments_ids)
    end
  end
end