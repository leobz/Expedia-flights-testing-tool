ENV['APP_ENV'] = 'test'

require_relative '../../api_rest/index'
require_relative 'functions_for_api-rest_testing'
require 'test/unit'
require 'rack/test'

class FilterByDurationRange < Test::Unit::TestCase
  include Rack::Test::Methods
  @@json_flights_data = File.read('examples/flights_data.json')
  @@request_example = JSON.parse(File.read('examples/request_example.json'))

  def app
    Sinatra::Application
  end

  def test_availableDurations_between_1_hour_and_2_hours
    send_request(
        define_filter(@@request_example, "duration_range", ["PT1H", "PT2H"]),
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    assert response["availableDurations"].all? { |duration| duration.match?(/PT1H/) || duration == "PT2H" }
  end

  def test_flightCards_between_1_hour_and_2_hours
    send_request(
        define_filter(@@request_example, "duration_range", ["PT1H", "PT2H"]),
        @@json_flights_data
    )
    response = JSON.parse(last_response.body)
    assert response["flightCards"].all? { |flightCard| flightCard["duration"].match?(/PT1H/) || flightCard["duration"] == "PT2H" }
  end
end
