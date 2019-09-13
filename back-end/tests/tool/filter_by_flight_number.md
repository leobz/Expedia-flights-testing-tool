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

# Filter by flight numbers

### First we get the list of all available flight numbers in this segment.

```ruby
>> p get_flight_numbers(segments)
["1455", "138", "346", "2257", "2536", "1211", "32", "2202", "835", "1433", "1363", "2458", "1402", "2053", "2014", "805", "886", "1393", "1950", "2501", "1416", "2489", "1946", "1423", "2418", "1412", "2393", "2492", "2055", "1321", "3468", "1131", "5663", "297", "6220", "2241", "3724", "1662", "673", "2134", "6222", "1754", "1238", "2085", "2607", "6215", "6194"]

```


### We filter by a particular flight number

#### CASE A
For example, we chose the first one on the list, the "1455"
```ruby
>> pp filter_segments_by_flight_number(data, segments, "1455")
[{<...>
  :flight_numbers=>["1455"],
  <...>
  :zid=>"ZFS-WEB-AA1455-DFW-MSY-1555466400-SUAIZNM1-S"}]

```

### CASE B

Now we choose another code: "1423".
In this case, we get TWO segments that comply with this filter.
```ruby
>> pp filter_segments_by_flight_number(data, segments, "1423")
[{<...>
  :flight_numbers=>["1946", "1423"],
  <...>
  :zid=>
   "ZFS-PUBLISHED-DL1946-DAL-ATL-1555427040-KA7NA0MA-K-DL1423-ATL-MSY-1555437360-KA7NA0MA-K"},
 {<...>
  :flight_numbers=>["2458", "1423"],
  <...>
  :zid=>
   "ZFS-PUBLISHED-DL2458-DFW-ATL-1555425300-KA7NA0MA-K-DL1423-ATL-MSY-1555437360-KA7NA0MA-K"}]

```

# Filter by a list of flight numbers

We see the number of flights with the following code "1455"
```ruby
>> amount_with_1455 =  filter_segments_by_list_of_flights_number(data, segments, "1455").size
>> puts amount_with_1455
1

```

We see the number of flights with the following code "1423".
```ruby
>> amount_with_1423 =  filter_segments_by_list_of_flights_number(data, segments, "1423").size
>> puts amount_with_1423
2

```

Now when passing a list with the codes "1455" and "1423", the number of results must be equal to 3 (1 + 2)
```ruby
>> p filter_segments_by_list_of_flights_number(data, segments, ["1455", "1423"]).size == amount_with_1455 + amount_with_1423
true
```

