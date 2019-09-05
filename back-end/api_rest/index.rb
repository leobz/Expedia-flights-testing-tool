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
  response = {"flightCards" => segments, 
              "availableFlightNumbers" => get_flight_numbers(segments), 
              "availablePrices" => get_prices(segments),
              "lowerPrice" => get_prices(segments).min,
              "highestPrice" => get_prices(segments).max,
              "availableAirlines" => get_airlines(flights_data, segments),
              "availableStops" => get_stops_amounts(flights_data, segments),
              "itinerariesSize" => itineraries_size(flights_data)
            }
  return response
end

def process_segments(flights_data, segments_id, filters, sort_type)
  segments = get_segments(flights_data, segments_id)
  segments = apply_filters(flights_data, segments, filters)
  return apply_sort(segments, sort_type)
end

def process_flights_data(json_received)
  flights_data = JSON.parse(json_received["flightsData"])['payload']
  filters = json_received["filters"]
  sort_type = json_received["sortType"]
  segments_id = json_received["segmentsId"].nil? ? [] : json_received["segmentsId"]
  return process_segments(flights_data, segments_id, filters, sort_type)
end

post '/ui_test' do
  content_type :json

  json_received = JSON.parse(request.body.read)
  segments = process_flights_data(json_received)
  return generate_response(json_received, segments).to_json
end
