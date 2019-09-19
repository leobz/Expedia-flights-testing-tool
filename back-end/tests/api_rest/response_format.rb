ENV['APP_ENV'] = 'test'

require_relative '../../api_rest/index'
require_relative 'functions_for_api-rest_testing'
require 'test/unit'
require 'rack/test'

class ResponseFormat < Test::Unit::TestCase
  include Rack::Test::Methods
  @@json_flights_data = File.read('examples/flights_data.json')
  @@request_example = JSON.parse(File.read('examples/request_example.json'))

  def app
    Sinatra::Application
  end

  def test_availableFlightNumbers
    send_request(
        @@request_example,
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    flights_numbers = response["flightCards"].map { |flightCard| flightCard["flight_numbers"] }
    assert_equal(flights_numbers.flatten.uniq, response["availableFlightNumbers"])
  end

  def test_availablePrices
    send_request(
        @@request_example,
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    prices = response["flightCards"].map { |flightCard| flightCard["price"] }
    assert_equal(prices.flatten.uniq, response["availablePrices"])
  end

  def test_availableDurations
    send_request(
        @@request_example,
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    durations = response["flightCards"].map { |flightCard| flightCard["duration"] }
    assert_equal(durations.flatten.uniq, response["availableDurations"])
  end

  def test_availableAirlines
    send_request(
        @@request_example,
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    airlines = response["flightCards"].map { |flightCard| flightCard["airlines"] }
    airlines_struct = airlines.flatten.uniq.map do |airline|
      {
          "name" => airline,
          "amount" => response["flightCards"].select { |flightCard| flightCard["airlines"].include?(airline) }.size
      }
    end
    assert_equal(airlines_struct, response["availableAirlines"])
  end

  def test_availableStops
    send_request(
        @@request_example,
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    stops_struct = {
        "0 stop" => response["flightCards"].select { |flightCard| flightCard["stops"] == 0 }.size,
        "1 stop" => response["flightCards"].select { |flightCard| flightCard["stops"] == 1 }.size,
        "2 or more stops" => response["flightCards"].select { |flightCard| flightCard["stops"] >= 2 }.size
    }
    assert_equal(stops_struct, response["availableStops"])
  end

  def test_lowestPrice
    send_request(
        @@request_example,
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    prices = response["flightCards"].map { |flightCard| flightCard["price"] }
    assert_equal(prices.min, response["lowestPrice"])
  end

  def test_highestPrice
    send_request(
        @@request_example,
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    prices = response["flightCards"].map { |flightCard| flightCard["price"] }
    assert_equal(prices.max, response["highestPrice"])
  end

  def test_lowestDuration
    send_request(
        @@request_example,
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    flightCard_with_min_duration = response["flightCards"].min_by { |flightCard| ISO8601::Duration.new(flightCard["duration"]).to_seconds }
    assert_equal(flightCard_with_min_duration["duration"], response["lowestDuration"])
  end

  def test_highestDuration
    send_request(
        @@request_example,
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    flightCard_with_max_duration = response["flightCards"].max_by { |flightCard| ISO8601::Duration.new(flightCard["duration"]).to_seconds }
    assert_equal(flightCard_with_max_duration["duration"], response["highestDuration"])
  end

  def test_itineraries_size
    #TODO
  end
end
