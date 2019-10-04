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

For practical reasons for the test, we will select the first 5 segments so as not to make a list too long.
```ruby
>> segments = segments.take(5)
>> p segments.size
5
```

# Sort by departure

### Sort by earliest departure date
First, we see the segments without applying the sort function
```ruby
>> segments.each do |segment|
..   p segment
.. end
{<...> :departure_time=>"2019-04-16T21:00:00",<...>}
{<...> :departure_time=>"2019-04-16T07:04:00",<...>}
{<...> :departure_time=>"2019-04-16T18:25:00",<...>}
{<...> :departure_time=>"2019-04-16T16:54:00",<...>}
{<...> :departure_time=>"2019-04-16T15:45:00",<...>}

```

Sort by earliest departure date.
```ruby
>> segments = sort_by_first_departure_date(segments)
>> segments.each do |segment|
..   p segment
.. end
{<...> :departure_time=>"2019-04-16T07:04:00",<...>}
{<...> :departure_time=>"2019-04-16T15:45:00",<...>}
{<...> :departure_time=>"2019-04-16T16:54:00",<...>}
{<...> :departure_time=>"2019-04-16T18:25:00",<...>}
{<...> :departure_time=>"2019-04-16T21:00:00",<...>}

```
