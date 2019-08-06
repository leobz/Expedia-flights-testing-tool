<!--
Load the necessary libraries
>> require_relative 'response_json/filter_and_sort_functions_for_segments.rb'
<...>

-->

### Cargamos los segmentos

Primero obtenemos los itnierarios de un Json normalizado, el cual contiene 54 segmentos totales en la
primera columna.
```ruby
>> data = JSON.parse(File.read('response_json/flights.json'))
>> segments = get_segments(data)
>> p segments.size
54
```


# Filtro por Rango de Precios

### Primero obtenemos la lista de todos los precios disponibles en este segmento. 

PRECIOS DISPONIBLES
```ruby
>> p get_prices(segments)
[28150, 29198, 33300, 37150, 37200, 40299, 45099, 48999, 55098]

```

### Filtramos para ver los que esten entre 37.000 y 38.0000

RANGO( 37000, 38000)
```ruby
>> pp filter_segmets_by_price_range(segments, 37000, 38000)
[{<...>
  :price=>37150,
  <...>
  :zid=>"ZFS-WEB-AA2607-DFW-MSY-1555429560-L0AIZRN1-L"},
 {<...>
  :price=>37200,
  <...>
  :zid=>
   "ZFS-PUBLISHED-UA6215-DFW-IAH-1555417800-SRA7AKDN-S-UA1662-IAH-MSY-1555426020-SRA7AKDN-S"},
 {<...>
  :price=>37200,
  <...>
  :zid=>
   "ZFS-PUBLISHED-UA6215-DFW-IAH-1555417800-SRA7AKDN-S-UA1754-IAH-MSY-1555434000-SRA7AKDN-S"}]

```
