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

# Sort by duration

First, we see the segments without applying the sort function.
```ruby
>> segments.each do |segment|
..   p segment
.. end
{<...>:duration=>"PT1H28M"<...>}
{<...>:duration=>"PT1H27M"<...>}
{<...>:duration=>"PT1H25M"<...>}
{<...>:duration=>"PT1H23M"<...>}
{<...>:duration=>"PT1H21M"<...>}

```

Sort by shorter duration.
```ruby
>> segments = sort_by_shorter_duration(segments)
>> segments.each do |segment|
..   p segment
.. end
{<...>:duration=>"PT1H21M"<...>}
{<...>:duration=>"PT1H23M"<...>}
{<...>:duration=>"PT1H25M"<...>}
{<...>:duration=>"PT1H27M"<...>}
{<...>:duration=>"PT1H28M"<...>}

```
