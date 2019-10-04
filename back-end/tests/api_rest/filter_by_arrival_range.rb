ENV['APP_ENV'] = 'test'

require_relative '../../api_rest/index'
require_relative 'functions_for_api-rest_testing'
require 'test/unit'
require 'rack/test'

class FilterByArrivalRange < Test::Unit::TestCase
  include Rack::Test::Methods
  @@json_flights_data = File.read('examples/flights_data.json')
  @@request_example = JSON.parse(File.read('examples/request_example.json'))

  def app
    Sinatra::Application
  end

  def test_availableArrivals_between_2019_04_16T18H
    send_request(
        define_filter(@@request_example, "arrival_range", ["2019-04-16T18:00", "2019-04-16T18:59:59"]),
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    assert response["availableArrivals"].all? { |arrival| arrival.match?(/2019-04-16T18/)}
  end

  def test_flightCards_between_2019_04_16T18H
    send_request(
        define_filter(@@request_example, "arrival_range", ["2019-04-16T18:00", "2019-04-16T18:59:59"]),
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    assert response["flightCards"].all? { |flightCard| flightCard["arrival_time"].match?(/2019-04-16T18/)}
  end
end
