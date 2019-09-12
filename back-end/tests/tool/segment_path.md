<!--
Load the necessary libraries
>> require_relative '../../tool/filter_and_sort_functions_for_segments.rb'
<...>

-->

First, we obtain the itineraries of a standardized JSON, which contains multicity itineraries(4 cities). This JSON contains 9 segments in the first column.
```ruby
>> data = JSON.parse(File.read('flights_data_examples/multicity_4_cities.json'))['payload']
>> first_segments =  get_segments(data)
>> p first_segments.size
9
```

## We choose the first segment
For practical reasons of the test, we visualize the first segment.
```ruby
>> p first_segments.first
{<...>:from=>"Buenos Aires",<...>:to=>"Miami",<...>}

```
Suppose we choose this segment, therefore what interests us is its ID.
```ruby
>> first_choice = first_segments.first
>> first_choice_id = first_choice[:zid]

```

## We choose the second segment
As we choose the first segment, we will now have to see the second available segments.
Different first segment choices cause different possible outcomes of second segments.
Let's look for our possible second segments, from the ID of the first option.
```ruby
>> second_segments = get_segments(data, [first_choice_id])  

```

Let's see what are the available segments.
```ruby
>> second_segments.each {|segments| p segments}
{<...>:from=>"Miami",<...>:to=>"New York",<...>}
{<...>:from=>"Miami",<...>:to=>"New York",<...>}
{<...>:from=>"Miami",<...>:to=>"New York",<...>}
{<...>:from=>"Miami",<...>:to=>"New York",<...>}
{<...>:from=>"Miami",<...>:to=>"New York",<...>}
{<...>:from=>"Miami",<...>:to=>"New York",<...>}
{<...>:from=>"Miami",<...>:to=>"New York",<...>}
{<...>:from=>"Miami",<...>:to=>"New York",<...>}
{<...>:from=>"Miami",<...>:to=>"New York",<...>}

```

We choose the first of this list as the second segment
```ruby
>> second_choice = second_segments.first
>> second_choice_id = second_choice[:zid]

```

### We choose the third segment
As we did with the second segment, we want to visualize the third available segments, remembering to establish as a condition, enter the IDs of the two previously selected segments.
```ruby
>> third_segments = get_segments(data, [first_choice_id, second_choice_id])   
>> third_segments.each {|segments| p segments}
{<...>:from=>"New York",<...>:to=>"Seattle"<...>}

```

We choose the first of this list as the third segment
```ruby
>> third_choice = third_segments.first
>> third_choice_id = third_choice[:zid]

```

### Verify segment matching

Since these segments are arranged logically, it is expected that the arrival of segment 1 is the departure of segment 2 and that this logic is applied to segment 3, etc.
```ruby
>> p first_choice[:to] == second_choice[:from]
true
```
```ruby
>> p second_choice[:to] == third_choice[:from]
true
```
