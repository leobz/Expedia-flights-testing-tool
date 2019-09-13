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

# Filter by duration range

### First, we obtain a list with all the available durations
```ruby
>> p get_durations(segments)
["PT1H28M", "PT1H27M", "PT1H25M", "PT1H23M", "PT1H21M", "PT1H20M", "PT6H26M", "PT5H1M", "PT5H26M", "PT5H59M", "PT6H27M", "PT5H43M", "PT6H0M", "PT5H25M", "PT5H2M"]
```

### We filter to see segments with durations between 1 hour and 2 hours
```ruby
>> p filter_segments_by_duration_range(data, segments, ["PT1H", "PT2H"])
[{<...>:duration=>"PT1H28M"<...>}, {<...>:duration=>"PT1H27M"<...>}, {<...>:duration=>"PT1H25M"<...>}, {<...>:duration=>"PT1H23M"<...>}, {<...>:duration=>"PT1H21M"<...>}, {<...>:duration=>"PT1H20M"<...>}]
```

### We filter to see segments with durations between 1 hour with 20 minutes and 1 hour with 25 minutes
```ruby
>> p filter_segments_by_duration_range(data, segments, ["PT1H20M", "PT1H25M"])
[{<...>:duration=>"PT1H25M"<...>}, {<...>:duration=>"PT1H23M"<...>}, {<...>:duration=>"PT1H21M"<...>}, {<...>:duration=>"PT1H20M"<...>}]
```

