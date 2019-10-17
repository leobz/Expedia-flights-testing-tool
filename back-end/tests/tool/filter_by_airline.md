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

# Filters by Airline

In this JSON we have 3 airlines: "American Airlines", "United" and "Delta".
Let's start filtering.

### Filter segments that have "American Airlines" flights

1) We filter
```ruby
>> american_airlines_segments = filter_segments_by_airline(segments, "American Airlines")
```

2) We count the number of segments that include the airline "American Airlines"
```ruby
>> p american_airlines_segments.size
7
```

3) We verify that they really have the airline "American Airlines"
```ruby
>> american_airlines_segments.each { |segment| p segment}
{<...> :airlines=>["American Airlines"]<...>}
{<...> :airlines=>["American Airlines"]<...>}
{<...> :airlines=>["American Airlines"]<...>}
{<...> :airlines=>["American Airlines"]<...>}
{<...> :airlines=>["American Airlines"]<...>}
{<...> :airlines=>["American Airlines"]<...>}
{<...> :airlines=>["American Airlines"]<...>}

```

### Filter segments that have "United" flights
1) We filter
```ruby
>> united_segments = filter_segments_by_airline(segments, "United")
```

2) We count the number of segments that include the airline "United"
```ruby
>> p filter_segments_by_airline(segments, "United").size
28
```

3) We verify that they really have the airline "United"
```ruby
>> united_segments.each { |segment| p segment}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}

```

### Filter segments that have "Delta" flights

1) We filter
```ruby
>> delta_segments = filter_segments_by_airline(segments, "Delta")
```

2) We count the number of segments that include the airline "Delta"
```ruby
>> p delta_segments.size
19
```

3) We verify that they really have the airline "Delta"
```ruby
>> delta_segments.each { |segment| p segment}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}

```

Note:
In this particular JSON file, each segment has an unique airline assigned for all its flights.
But if the segments had several airlines, the same segment may appear on several filters of different airlines, provided it contains they airlines.

# Filters by airline list
We check that the number of filtered airlines is equal to the sum of filtering airlines separately.
The sum of "American Airlines" and "Delta" is 26 (7 + 19 = 26)

```ruby
>> p filter_segments_by_list_of_airlines(data, segments, ["Delta", "American Airlines"]).size
26
```

```ruby
>> p filter_segments_by_list_of_airlines(data, segments, ["Delta", "American Airlines"]).size == delta_segments.size + american_airlines_segments.size
true
```