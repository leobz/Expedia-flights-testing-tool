<!--
Load the necessary libraries
>> require_relative '../../tool/filter_and_sort_functions_for_segments.rb'
<...>

-->

First we get the normalized JSON itineraries, which contain 54 segments in the first column.
```ruby
>> data = JSON.parse(File.read('flights_data_examples/flights.json'))['payload']
>> segments = get_segments(data)
>> p segments.size
54
```
For practical reasons for the test, we will select the first 15 segments so as not to make a list too long.
```ruby
>> segments = segments.take(15)
>> p segments.size
15
```

# Filter by departure range

### First, we obtain a list with all the available departures
```ruby
>> get_departures(segments).sort.each { |departure| p departure}
"2019-04-16T06:00:00"
"2019-04-16T07:00:00"
"2019-04-16T07:04:00"
"2019-04-16T09:35:00"
"2019-04-16T12:51:00"
"2019-04-16T13:15:00"
"2019-04-16T13:44:00"
"2019-04-16T14:30:00"
"2019-04-16T15:45:00"
"2019-04-16T16:03:00"
"2019-04-16T16:54:00"
"2019-04-16T17:04:00"
"2019-04-16T18:25:00"
"2019-04-16T21:00:00"
```

### We filter to see segments with departures between "2019-04-16T07:00:00" and "2019-04-16T08:00:00"
```ruby
>> pp filter_segments_by_departure_range(segments, ["2019-04-16T07:00:00", "2019-04-16T08:00:00"])
[{<...>
  :departure_time=>"2019-04-16T07:04:00",
  <...>},
 {<...>
  :departure_time=>"2019-04-16T07:00:00",
  <...>}]

```
 
### We filter to see segments with departures between "2019-04-16T18H15M" and "2019-04-16T18H20M" (other format)
```ruby
>> pp filter_segments_by_departure_range(segments, ["2019-04-16T07H03M", "2019-04-16T07H05M"])
[{<...>
  :departure_time=>"2019-04-16T07:04:00",
  <...>}]
```
