ENV['APP_ENV'] = 'test'

require_relative '../../api_rest/index'
require_relative 'functions_for_api-rest_testing'
require 'test/unit'
require 'rack/test'

class FilterByAirline < Test::Unit::TestCase
  include Rack::Test::Methods
  @@json_flights_data = File.read('examples/flights_data.json')
  @@request_example = JSON.parse(File.read('examples/request_example.json'))

  def app
    Sinatra::Application
  end

  def test_include_airline
    request_base = define_filter(@@request_example, "airlines", "American Airlines")
    post('/ui_test',
         generate_request(request_base, @@json_flights_data),
         {'CONTENT_TYPE' => 'application/json'}
    )
    response = JSON.parse(last_response.body)
    assert response["flightCards"].all? { |flightCard| flightCard["airlines"].include?("American Airlines") }
  end

  def test_amount_of_segments
    request_base = define_filter(@@request_example, "airlines", "American Airlines")
    post('/ui_test',
         generate_request(request_base, @@json_flights_data),
         {'CONTENT_TYPE' => 'application/json'}
    )
    response = JSON.parse(last_response.body)
    assert response["flightCards"].size == 7
  end
end