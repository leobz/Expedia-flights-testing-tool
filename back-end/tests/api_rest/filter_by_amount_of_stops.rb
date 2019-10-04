ENV['APP_ENV'] = 'test'

require_relative '../../api_rest/index'
require_relative 'functions_for_api-rest_testing'
require 'test/unit'
require 'rack/test'

class FilterByAmountOfStops < Test::Unit::TestCase
  include Rack::Test::Methods
  @@json_flights_data = File.read('examples/flights_data.json')
  @@request_example = JSON.parse(File.read('examples/request_example.json'))

  def app
    Sinatra::Application
  end

  def test_amount_of_flights_with_0_stops
    send_request(
        define_filter(@@request_example, "amount_of_stop", 0),
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    assert_equal response["flightCards"].size, 7
  end

  def test_amount_of_flights_with_1_stops
    send_request(
        define_filter(@@request_example, "amount_of_stop", 1),
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    assert_equal response["flightCards"].size, 47
  end

  def test_amount_of_flights_with_2_stops
    send_request(
        define_filter(@@request_example, "amount_of_stop", 2),
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    assert_equal response["flightCards"].size, 0
  end

  def test_list_whit_number_of_stops_is_equal_to_the_sum_of_filtering_the_stops_separately
    send_request(
        define_filter(@@request_example, "amount_of_stop", [0,1]),
        @@json_flights_data
    )
    response_whit_number_of_stops_list = JSON.parse(last_response.body)["flightCards"]

    send_request(
        define_filter(@@request_example, "amount_of_stop", 0),
        @@json_flights_data
    )
    response_with_0_stops = JSON.parse(last_response.body)["flightCards"]

    send_request(
        define_filter(@@request_example, "amount_of_stop", 1),
        @@json_flights_data
    )
    response_with_1_stops = JSON.parse(last_response.body)["flightCards"]

    assert_equal response_whit_number_of_stops_list.size, response_with_0_stops.size + response_with_1_stops.size
  end

end