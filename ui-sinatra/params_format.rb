
require_relative '../response_json/filter_and_sort_functions_for_segments.rb'

data = JSON.parse(File.read('../response_json/flights.json'))
segments = get_segments(data)

params = JSON.parse(File.read('params.json'))
filters = params["filters"]

def apply_filters(data, segments, filters)
    filters.each_key do |filter_name|
      if filters[filter_name]["selected"] == true
        p "#{filter_name} flag 1"
        filter_params = filters[filter_name]
        segments = apply_filter(data, segments, filter_name, filter_params)
      end
    end
    return segments
end

def apply_filter(data, segments, filter_name, filter_params)
  case filter_name
  when "amount_of_stop"
    segments = filter_segmets_for_amount_of_stop(data, segments, filter_params["amount"].to_i)
  when "airlines"
    segments =  filter_segmets_by_airlines(data, segments, filter_params["airline_name"])
  when "price_range"
    segments = filter_segmets_by_price_range(segments, filter_params["prices"][0], filter_params["prices"][1])
  when "fligth_number"
    segments = filter_segmets_by_flight_number(segments, filter_params["flight_number"])
  end

end

#filter_segmets_for_amount_of_stop(data, segments, amount)
#filter_segmets_by_airlines(data, segments, airline_name)
#filter_segmets_by_price_range(segments, min, max)
#filter_segmets_by_flight_number(segments, flight_number)

#sort_by_lower_price(segments)
#sort_by_highest_price(segments)
#sort_by_shorter_duration(segments)
#sort_by_first_departure_date(segments)
