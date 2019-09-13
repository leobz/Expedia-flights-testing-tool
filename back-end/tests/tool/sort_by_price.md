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

For practical reasons for the test, we will select the first 15 segments so as not to make a list too long.
```ruby
>> segments = segments.take(15)
>> p segments.size
15

```

# Sort by lowest price

```ruby
>> pp sort_by_lowest_price(segments)
[<...>:price=>29198,
<...>:price=>29198,
<...>:price=>29198,
<...>:price=>29198,
<...>:price=>29198,
<...>:price=>29198,
<...>:price=>29198,
<...>:price=>29198,
<...>:price=>29198,
<...>:price=>31560,
<...>:price=>31560,
<...>:price=>31560,
<...>:price=>31560,
<...>:price=>31560,
<...>:price=>31560<...>]

```

# Sort by highest price

```ruby
>> pp sort_by_highest_price(segments)
[<...>:price=>31560,
<...>:price=>31560,
<...>:price=>31560,
<...>:price=>31560,
<...>:price=>31560,
<...>:price=>31560,
<...>:price=>29198,
<...>:price=>29198,
<...>:price=>29198,
<...>:price=>29198,
<...>:price=>29198,
<...>:price=>29198,
<...>:price=>29198,
<...>:price=>29198,
<...>:price=>29198<...>]
```
