ENV['APP_ENV'] = 'test'

require_relative '../../api_rest/index'
require_relative 'functions_for_api-rest_testing'
require 'test/unit'
require 'rack/test'

class SortByDuration < Test::Unit::TestCase
  include Rack::Test::Methods
  @@json_flights_data = File.read('examples/flights_data.json')
  @@request_example = JSON.parse(File.read('examples/request_example.json'))

  def app
    Sinatra::Application
  end

  def test_flightCards_sorted_by_shortest_duration
    send_request(
        define_sort(@@request_example, "durationShortest"),
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    durations = response["flightCards"].map {|flightCard| ISO8601::Duration.new(flightCard["duration"]).to_seconds }
    assert_equal(durations, durations.sort)
  end

  def test_flightCards_sorted_by_longest_duration
    send_request(
        define_sort(@@request_example, "durationLongest"),
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    durations = response["flightCards"].map {|flightCard| ISO8601::Duration.new(flightCard["duration"]).to_seconds }
    assert_equal(durations, durations.sort.reverse)
  end
end

