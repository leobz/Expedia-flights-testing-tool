require 'sinatra'
require_relative '../response_json/filter_and_sort_functions_for_segments.rb'

def generate_response(data, segments)
  response = {"flightCards" => segments, 
              "availableFlightNumbers" => get_flight_numbers(segments), 
              "availablePrices" => get_prices(segments), 
              "availableAirlines" => get_airline_names(segments),
              "availableStops" => get_stops_amounts(data, segments),
              "itinerariesSize" => itineraries_size(data),
            }
  return response
end

def process_segments(data, segments_id, filters, sort_type)
  segments = get_segments(data, segments_id)
  segments = apply_filters(data, segments, filters)
  return apply_sort(segments, sort_type)
end

def process_flights_data(flights_data, json_received)
  filters = json_received["filters"]
  sort_type = json_received["sortType"]
  segments_id = json_received["segmentsId"].nil? ? [] : json_received["segmentsId"]
  return process_segments(flights_data, segments_id, filters, sort_type)
end

set :bind, '0.0.0.0'

post '/ui_test' do
  content_type :json

  json_received = JSON.parse(request.body.read)
  flights_data = json_received["flightsData"]['payload']
  segments = process_flights_data(flights_data, json_received)
  return generate_response(flights_data, segments).to_json
end

__END__
