require 'sinatra'
require_relative '../response_json/filter_and_sort_functions_for_segments.rb'

def generate_response(data, segments)
  available_flight_numbers = get_flight_numbers(segments)
  available_prices = get_prices(segments)
  available_airlines = get_airline_names(segments)
  available_stops = get_stops_amounts(data, segments)
  response = {"segments" => segments, 
              "available_flight_numbers" => available_flight_numbers, 
              "available_prices" => available_prices, 
              "available_airlines" => available_airlines,
              "available_stops" => available_stops}
  return response
end

def process_segments(data, segments_id, filters, sort_type)
  segments = get_segments(data, segments_id)
  segments = apply_filters(data, segments, filters)
  segments = apply_sort(segments, sort_type)
  return segments
end

set :bind, '0.0.0.0'

$data = JSON.parse(File.read('../response_json/flights.json'))
$original_segments = get_segments($data)

get '/' do
  content_type :json
  json_received = JSON.parse(request.body.read)
  filters = json_received["filters"] 
  sort_type = json_received["sort_type"]
  segments_id = json_received["segments_id"].nil? ? [] : json_received["segments_id"]

  segments = process_segments($data, segments_id, filters, sort_type)
  generate_response($data, segments).to_json
end


get '/multicity_4_cities' do
  content_type :json
  data_multicity_4_cities = JSON.parse(File.read('../response_json/multicity_4_cities.json'))['payload']
  json_received = JSON.parse(request.body.read)
  filters = json_received["filters"]
  sort_type = json_received["sort_type"]
  segments_id = json_received["segments_id"].nil? ? [] : json_received["segments_id"]

  segments = process_segments(data_multicity_4_cities, segments_id, filters, sort_type)
  generate_response(data_multicity_4_cities, segments).to_json
end

get '/roundtrip' do
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
