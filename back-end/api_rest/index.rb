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
  #This is the EndPoint that Receives all the flights' itineraries data from the UI and
  #not for one hard coded JSON
  content_type :json

  json_received = JSON.parse(request.body.read)
  flights_data = json_received["flightsData"]['payload']
  segments = process_flights_data(flights_data, json_received)
  return generate_response(flights_data, segments).to_json
end


#HARDCODED EndPoints
post '/flights' do
  content_type :json

  flights_data = JSON.parse(File.read('../response_json/flights.json'))
  json_received = JSON.parse(request.body.read)
  segments = process_flights_data(flights_data, json_received)
  generate_response(flights_data, segments).to_json
end

post '/multicity_4_cities' do
  content_type :json
  flights_data = JSON.parse(File.read('../response_json/multicity_4_cities.json'))['payload']
  json_received = JSON.parse(request.body.read)
  segments = process_flights_data(flights_data, json_received)
  generate_response(flights_data, segments).to_json
end

post '/roundtrip' do
  content_type :json

  flights_data = JSON.parse(File.read('../response_json/roundtrip.json'))['payload']
  json_received = JSON.parse(request.body.read)
  segments = process_flights_data(flights_data, json_received)
  generate_response(flights_data, segments).to_json
end

__END__
