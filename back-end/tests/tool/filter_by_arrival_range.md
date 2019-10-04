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

# Filter by duration range

### First, we obtain a list with all the available durations
```ruby
>> get_arrivals(segments).sort.each { |arrival| p arrival}
"2019-04-16T08:31:00"
"2019-04-16T11:02:00"
"2019-04-16T12:43:00"
"2019-04-16T15:04:00"
"2019-04-16T15:34:00"
"2019-04-16T17:06:00"
"2019-04-16T18:16:00"
"2019-04-16T18:17:00"
"2019-04-16T19:50:00"
"2019-04-16T20:30:00"
"2019-04-16T22:28:00"
"2019-04-16T22:30:00"
"2019-04-16T23:30:00"
```

### We filter to see segments with arrivals between 2019-04-16T08H" and "2019-04-16T09H
```ruby
>> pp filter_segments_by_arrival_range(segments, ["2019-04-16T08H", "2019-04-16T09H"])
[{<...>
  :arrival_time=>"2019-04-16T08:31:00",
  <...>}]

```

### We filter to see segments with durations between "2019-04-16T18H15M" and "2019-04-16T18H20M"
```ruby
>> pp filter_segments_by_arrival_range(segments, ["2019-04-16T18H15M", "2019-04-16T18H20M"])
[{<...>
  :arrival_time=>"2019-04-16T18:17:00",
  <...>},
 {<...>
  :arrival_time=>"2019-04-16T18:16:00",
  <...>},
 {<...>
  :arrival_time=>"2019-04-16T18:16:00",
  <...>}]

```

### We filter to see segments with durations between "2019-04-16T18:15" and "2019-04-16T18:20" (other format)
```ruby
>> pp filter_segments_by_arrival_range(segments, ["2019-04-16T18:15", "2019-04-16T18:20"])
[{<...>
  :arrival_time=>"2019-04-16T18:17:00",
  <...>},
 {<...>
  :arrival_time=>"2019-04-16T18:16:00",
  <...>},
 {<...>
  :arrival_time=>"2019-04-16T18:16:00",
 <...>}]
```
