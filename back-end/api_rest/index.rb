require 'sinatra'
require 'sinatra/cross_origin'
require_relative '../tool/filter_and_sort_functions_for_segments.rb'

register Sinatra::CrossOrigin

configure do
  set :bind, '0.0.0.0'
  set :allow_origin, :any
  set :allow_methods, [:get, :post]
  set :allow_credentials, true
  enable :cross_origin
end

before do
  response.headers['Access-Control-Allow-Origin'] = '*'
end

options "*" do
  response.headers["Allow"] = "GET, PUT, POST, DELETE, OPTIONS"
  response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token"
  response.headers["Access-Control-Allow-Origin"] = "*"
  200
end

def generate_response(json_received, segments)
  flights_data = JSON.parse(json_received["flightsData"])['payload']
  
  {"flightCards" => segments.map {|s| s.to_parsed_json },
   "availableFlightNumbers" => get_flight_numbers(segments),
   "availablePrices"        => get(segments, :price),
   "availableDurations"     => get(segments, :duration),
   "availableDepartures"    => get(segments, :departure_time),
   "availableArrivals"      => get(segments, :arrival_time),
   "availableAirlines"      => get_airlines(segments),
   "availableStops"         => get_stops_amounts(flights_data, segments),
   "lowestPrice"            => get(segments, :price).min,
   "highestPrice"           => get(segments, :price).max,
   "lowestDuration"         => min(segments, :duration),
   "highestDuration"        => max(segments, :duration),
   "earliestDeparture"      => min(segments, :departure_time),
   "latestDeparture"        => max(segments, :departure_time),
   "earliestArrival"        => min(segments, :arrival_time),
   "latestArrival"          => max(segments, :arrival_time),
   "itinerariesSize"        => itineraries_size(flights_data)
  }
end

def process_segments(flights_data, segments_id, filters, sort_type)
  segments = get_segments(flights_data, segments_id)
  segments = apply_filters(flights_data, segments, filters)
  apply_sort(segments, sort_type)
end

def process_flights_data(json_received)
  flights_data = JSON.parse(json_received["flightsData"])['payload']
  filters = json_received["filters"]
  sort_type = json_received["sortType"]
  segments_id = json_received["segmentsId"].nil? ? [] : json_received["segmentsId"]
  process_segments(flights_data, segments_id, filters, sort_type)
end

post '/ui_test' do
  content_type :json

  json_received = JSON.parse(request.body.read)
  segments = process_flights_data(json_received)
  generate_response(json_received, segments).to_json
end
