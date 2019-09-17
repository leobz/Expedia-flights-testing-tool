ENV['APP_ENV'] = 'test'

require_relative '../../api_rest/index'
require_relative 'functions_for_api-rest_testing'
require 'test/unit'
require 'rack/test'

class FilterByFlightNumber < Test::Unit::TestCase
  include Rack::Test::Methods
  @@json_flights_data = File.read('examples/flights_data.json')
  @@request_example = JSON.parse(File.read('examples/request_example.json'))

  def app
    Sinatra::Application
  end

  def test_availableFlightNumbers_include_flight_number
    send_request(
        define_filter(@@request_example, "fligth_number", "1455"),
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    assert response["availableFlightNumbers"].include?("1455")
  end

  def test_flightCards_include_flight_number
    send_request(
        define_filter(@@request_example, "fligth_number", "1455"),
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    assert response["flightCards"].all? { |flightCard| flightCard["flight_numbers"].include?("1455") }
  end
end
