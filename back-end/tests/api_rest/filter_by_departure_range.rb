ENV['APP_ENV'] = 'test'

require_relative '../../api_rest/index'
require_relative 'functions_for_api-rest_testing'
require 'test/unit'
require 'rack/test'

class FilterByDepartureRange < Test::Unit::TestCase
  include Rack::Test::Methods
  @@json_flights_data = File.read('examples/flights_data.json')
  @@request_example = JSON.parse(File.read('examples/request_example.json'))

  def app
    Sinatra::Application
  end

  def test_availableDepartures_between_2019_04_16T07H
    send_request(
        define_filter(@@request_example, "departure_range", ["2019-04-16T07:00:00", "2019-04-16T07:59:59"]),
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    assert response["availableDepartures"].all? { |departure| departure.match?(/2019-04-16T07/)}
  end

  def test_flightCards_between_2019_04_16T07H
    send_request(
        define_filter(@@request_example, "departure_range", ["2019-04-16T07:00:00", "2019-04-16T07:59:59"]),
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    assert response["flightCards"].all? { |flightCard| flightCard["departure_time"].match?(/2019-04-16T07/)}
  end
end
