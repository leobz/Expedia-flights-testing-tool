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


# Filtro por Rango de Precios

### Primero obtenemos la lista de todos los precios disponibles en este segmento. 

PRECIOS DISPONIBLES
```ruby
>> p get_prices(segments)
[31560, 29198, 33300, 41559, 37200, 40299, 45099, 48999, 55098]

```

### Filtramos para ver los que esten entre 37.000 y 38.0000

RANGO( 37000, 38000)
```ruby
>> p filter_segments_by_price_range(data, segments, [37000, 38000])
[{<...>:price=>37200<...>}, {<...>:price=>37200<...>}]

```
