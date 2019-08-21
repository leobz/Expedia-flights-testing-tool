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
  segments = apply_sort(segments, sort_type)
  return segments
end

set :bind, '0.0.0.0'

post '/ui_test' do
  #This is the EndPoint that Receives all the flights' itineraries data from the UI and
  #not for one hard coded JSON
  content_type :json
  json_received = JSON.parse(request.body.read)
  flights_data = json_received["flightsData"]['payload']
  filters = json_received["filters"]
  sort_type = json_received["sortType"]
  segments_id = json_received["segmentsId"].nil? ? [] : json_received["segmentsId"]

  segments = process_segments(flights_data, segments_id, filters, sort_type)
  generate_response(flights_data, segments).to_json
end


#HARDCODED EndPoints
post '/flights' do
  content_type :json
  data = JSON.parse(File.read('../response_json/flights.json'))
  json_received = JSON.parse(request.body.read)
  filters = json_received["filters"]
  sort_type = json_received["sort_type"]
  segments_id = json_received["segments_id"].nil? ? [] : json_received["segments_id"]

  segments = process_segments(data, segments_id, filters, sort_type)
  generate_response(data, segments).to_json
end

post '/multicity_4_cities' do
  content_type :json
  data_multicity_4_cities = JSON.parse(File.read('../response_json/multicity_4_cities.json'))['payload']
  json_received = JSON.parse(request.body.read)
  filters = json_received["filters"]
  sort_type = json_received["sort_type"]
  segments_id = json_received["segments_id"].nil? ? [] : json_received["segments_id"]

  segments = process_segments(data_multicity_4_cities, segments_id, filters, sort_type)
  generate_response(data_multicity_4_cities, segments).to_json
end

post '/roundtrip' do
  content_type :json
  data_roundtrip = JSON.parse(File.read('../response_json/roundtrip.json'))['payload']
  json_received = JSON.parse(request.body.read)
  filters = json_received["filters"]
  sort_type = json_received["sort_type"]
  segments_id = json_received["segments_id"].nil? ? [] : json_received["segments_id"]

  segments = process_segments(data_roundtrip, segments_id, filters, sort_type)
  generate_response(data_roundtrip, segments).to_json
end

__END__
