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
# Flight Card Format
For practical reasons for the test, we will select the first one, since they all have the same format.
```ruby
>> segment = segments.first
>> pp segment
{:airlines=>["American Airlines"],
 :arrival_time=>"2019-04-16T22:28:00",
 :departure_time=>"2019-04-16T21:00:00",
 :duration=>"PT1H28M",
 :flight_numbers=>["1455"],
 :from=>"Dallas",
 :price=>31560,
 :stops=>0,
 :to=>"New Orleans",
 :zid=>"ZFS-WEB-AA1455-DFW-MSY-1555466400-SUAIZNM1-S"}

```