require_relative '../../tool/filter_and_sort_functions_for_segments.rb'

def generate_request(request_example, json_flights_data)
  request_example.merge!(flightsData: json_flights_data)
  request_example.to_json
end

def define_filter(request_example, filter_name, value)
  request_example["filters"][filter_name]["selected"] = true
  case filter_name
  when "amount_of_stop"
    request_example["filters"][filter_name]["amount"] = value
  when "airlines"
    request_example["filters"][filter_name]["airline_name"] = value
  when "price_range"
    request_example["filters"][filter_name]["prices"] = value
  when "duration_range"
    request_example["filters"][filter_name]["durations"] = value
  when "fligth_number"
    request_example["filters"][filter_name]["flight_number"] = value
  end
  request_example
end

def define_sort(request_example, sort_type)
  request_example["sortType"] = sort_type
  request_example
end

def select_segments_id(request_example, segments_id)
  request_example["segmentsId"] = segments_id
  request_example
end