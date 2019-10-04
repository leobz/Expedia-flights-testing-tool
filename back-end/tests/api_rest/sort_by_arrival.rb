ENV['APP_ENV'] = 'test'

require_relative '../../api_rest/index'
require_relative 'functions_for_api-rest_testing'
require 'test/unit'
require 'rack/test'

class SortByArrival < Test::Unit::TestCase
  include Rack::Test::Methods
  @@json_flights_data = File.read('examples/flights_data.json')
  @@request_example = JSON.parse(File.read('examples/request_example.json'))

  def app
    Sinatra::Application
  end

  def test_flightCards_sorted_by_earliest_arrival
    send_request(
        define_sort(@@request_example, "arrivalEarliest"),
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    arrival_times = response["flightCards"].map {|flightCard| flightCard["arrival_time"] }
    assert_equal(arrival_times, arrival_times.sort)
  end

  def test_flightCards_sorted_by_latest_arrival
    send_request(
        define_sort(@@request_example, "arrivalLatest"),
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    arrival_times = response["flightCards"].map {|flightCard| flightCard["arrival_time"] }
    assert_equal(arrival_times, arrival_times.sort.reverse)
  end
end

