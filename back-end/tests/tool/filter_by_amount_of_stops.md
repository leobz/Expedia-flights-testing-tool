<!--
Load the necessary libraries
>> require_relative '../../tool/filter_and_sort_functions_for_segments.rb'
<...>

-->

First we get the normalized JSON itineraries, which contain 54 segments in the first column.
```ruby
>> data = JSON.parse(File.read('flights_data_examples/flights.json'))
>> segments = get_segments(data)
>> p segments.size
54
```

# Filters by amount of stops

### Amount of flights according to number of stops.
Amount of flights with 0 stops.
```ruby
>> p filter_segments_by_amount_of_stop(data, segments, 0).size
7
```
Amount of flights with 1 stops.
```ruby
>> p filter_segments_by_amount_of_stop(data, segments, 1).size
47
```
Amount of flights with 2 stops.
```ruby
>> p filter_segments_by_amount_of_stop(data, segments, 2).size
0
```

### The sum of the flights filtered by stops gives the totality of the flights.
Since the filtered ones are disjoint groups (a segment cannot have 2 stops and 0 stops at the same time), the sum must give the total. In this case 54 (7 + 47 + 0 = 54)
```ruby
>> acc = 0
>> 3.times do |stops_amount|
..   acc += filter_segments_by_list_of_amounts_of_stops(data, segments, stops_amount).size
.. end
>> p acc == segments.size
true
```


### Filter by list of Stop quantities: The number of filtered airlines is equal to the sum of filtering the airlines separately
1) List with numbers of stops = [0,2]
Number of flights with 0 stops + Number of flights with 2 stops
```ruby
>> p filter_segments_by_list_of_amounts_of_stops(data, segments, [0, 2]).size == filter_segments_by_list_of_amounts_of_stops(data, segments, 0).size + filter_segments_by_list_of_amounts_of_stops(data, segments, 2).size
true
```

2) List with numbers of stops = [1,2]
Number of flights with 1 stops + Number of flights with 2 stops
```ruby
>> p filter_segments_by_list_of_amounts_of_stops(data, segments, [1, 2]).size == filter_segments_by_list_of_amounts_of_stops(data, segments, 1).size + filter_segments_by_list_of_amounts_of_stops(data, segments, 2).size
true
```
