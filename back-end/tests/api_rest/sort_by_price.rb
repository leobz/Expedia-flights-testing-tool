ENV['APP_ENV'] = 'test'

require_relative '../../api_rest/index'
require_relative 'functions_for_api-rest_testing'
require 'test/unit'
require 'rack/test'

class SortByPrice < Test::Unit::TestCase
  include Rack::Test::Methods
  @@json_flights_data = File.read('examples/flights_data.json')
  @@request_example = JSON.parse(File.read('examples/request_example.json'))

  def app
    Sinatra::Application
  end

  def test_flightCards_sorted_by_lowest_price
    send_request(
        define_sort(@@request_example, "priceLowest"),
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    prices = response["flightCards"].map {|flightCard| flightCard["price"]}
    assert_equal(prices, prices.sort)
  end

  def test_flightCards_sorted_by_highest_price
    send_request(
        define_sort(@@request_example, "priceHighest"),
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    prices = response["flightCards"].map {|flightCard| flightCard["price"]}
    assert_equal(prices, prices.sort.reverse)
  end
end

