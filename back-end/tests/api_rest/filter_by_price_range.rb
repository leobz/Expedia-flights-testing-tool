ENV['APP_ENV'] = 'test'

require_relative '../../api_rest/index'
require_relative 'functions_for_api-rest_testing'
require 'test/unit'
require 'rack/test'

class FilterByPriceRange < Test::Unit::TestCase
  include Rack::Test::Methods
  @@json_flights_data = File.read('examples/flights_data.json')
  @@request_example = JSON.parse(File.read('examples/request_example.json'))

  def app
    Sinatra::Application
  end

  def test_availablePrices_between_37000_and_38000
    send_request(
        define_filter(@@request_example, "price_range", [37000, 38000]),
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    assert response["availablePrices"].all? { |price| price.between?(37000, 38000) }
  end

  def test_flightCards_between_37000_and_38000
    send_request(
        define_filter(@@request_example, "price_range", [37000, 38000]),
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    assert response["flightCards"].all? { |flightCard| flightCard["price"].between?(37000, 38000) }
  end
end
