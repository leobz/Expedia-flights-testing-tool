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

# Filter by price range

### First, we obtain a list with all the available prices
```ruby
>> p get_prices(segments)
[31560, 29198, 33300, 41559, 37200, 40299, 45099, 48999, 55098]

```

### We filter to see those between 37,000 and 38,000
```ruby
>> p filter_segments_by_price_range(segments, [37000, 38000])
[{<...>:price=>37200<...>}, {<...>:price=>37200<...>}]

```
