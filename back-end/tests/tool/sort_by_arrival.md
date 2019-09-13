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

For practical reasons for the test, we will select the first 5 segments so as not to make a list too long.
```ruby
>> segments = segments.take(5)
>> p segments.size
5
```

# Sort by arrival

### Sort by earliest arrival
First, we see the segments without applying the sort function.
```ruby
>> segments.each do |segment|
..   p segment
.. end
{<...>:arrival_time=>"2019-04-16T22:28:00"<...>}
{<...>:arrival_time=>"2019-04-16T08:31:00"<...>}
{<...>:arrival_time=>"2019-04-16T19:50:00"<...>}
{<...>:arrival_time=>"2019-04-16T18:17:00"<...>}
{<...>:arrival_time=>"2019-04-16T17:06:00"<...>}
```

Sort by earliest arrival date
```ruby
>> segments = sort_by_first_arrival_date(segments)
>> segments.each do |segment|
..   p segment
.. end
{<...>:arrival_time=>"2019-04-16T08:31:00"<...>}
{<...>:arrival_time=>"2019-04-16T17:06:00"<...>}
{<...>:arrival_time=>"2019-04-16T18:17:00"<...>}
{<...>:arrival_time=>"2019-04-16T19:50:00"<...>}
{<...>:arrival_time=>"2019-04-16T22:28:00"<...>}
```
