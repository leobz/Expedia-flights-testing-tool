<!--
Load the necessary libraries
>> require_relative '../../tool/filter_and_sort_functions_for_segments.rb'
<...>

-->

## We load the flight data

```ruby
>> data = JSON.parse(File.read('flights_data_examples/multicity_3_cities.json'))['payload']

```

## The price of the itinerary is equal to the sum of the prices of its segments

```ruby
>> def itinerary_price_equal_to_prices_of_its_segments(data)
..   valid = true
..   data['itineraries'].each do |itinerary|
..     ids_of_selected_segments = []
..     segment_prices = []
..     itinerary['segment_ids'].each do |segment_id|
..       segment = get_segments(data, ids_of_selected_segments).select {|segment| segment[:zid] == segment_id}
..       segment_prices << segment.first[:price]
..       ids_of_selected_segments << segment_id
..     end
..     valid = false if define_price(itinerary) != segment_prices.sum
..   end
..   return valid
.. end
>>  puts itinerary_price_equal_to_prices_of_its_segments(data)  # byexample: +timeout=10
true
```
