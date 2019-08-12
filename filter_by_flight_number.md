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


# Filtro por codigo de vuelo

### Primero obtenemos la lista de todos los numeros de vuelos disponibles en este segmento. 

```ruby
>> p get_flight_numbers(segments)
["1455", "138", "346", "2257", "2536", "1211", "32", "2202", "835", "1433", "1363", "2458", "1402", "2053", "2014", "805", "886", "1393", "1950", "2501", "1416", "2489", "1946", "1423", "2418", "1412", "2393", "2492", "2055", "1321", "3468", "1131", "5663", "297", "6220", "2241", "3724", "1662", "673", "2134", "6222", "1754", "1238", "2085", "2607", "6215", "6194"]

```


## Filtramos por incluision  de un numero de vuelo en particular
### CASO A
Por ejemplo elejimos el primero de la lista, el "1455"

```ruby
>> pp filter_segments_by_flight_number(data, segments, "1455")
[{<...>
  :flight_numbers=>["1455"],
  <...>
  :zid=>"ZFS-WEB-AA1455-DFW-MSY-1555466400-SUAIZNM1-S"}]

```

### CASO B

Ahora elegimos otro codigo: "1423".
En este caso obtenemos DOS segmentos que cumplen con este filtro.

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

# Filtro por lista de codigos de vuelo

Vemos la cantidad de vuelos con el siguiente codigo "1455"

```ruby
>> p filter_segments_by_list_of_flights_number(data, segments, "1455").size
1

```
Y tambien la cantidad de vuelos con el codigo "1423".

```ruby
>> p filter_segments_by_list_of_flights_number(data, segments, "1423").size
2

```

Ahora al pasarle una lista con los codigos "1455" y "1423".
Por lo tanto la suma deberia dar 1 + 2 = 3

```ruby
>> p filter_segments_by_list_of_flights_number(data, segments, ["1455", "1423"]).size
3

```