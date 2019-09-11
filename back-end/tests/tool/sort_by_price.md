<!--
Load the necessary libraries
>> require_relative '../../tool/filter_and_sort_functions_for_segments.rb'
<...>

-->

### Cargamos los segmentos

Primero obtenemos los itnierarios de un Json normalizado, el cual contiene 54 segmentos totales en la
primera columna.
```ruby
>> data = JSON.parse(File.read('flights_data_examples/flights.json'))
>> segments = get_segments(data)
>> p segments.size
54
```

Por razones practicas del test, visualizamos los primeros 15 para que la lista no sea demasiado larga. 

```ruby
>> segments = segments.take(15)
>> p segments.size
15

```

# Ordenamos por Menor precio


```ruby
>> pp sort_by_lower_price(segments)
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

# Ordenamos por Mayor precio


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
