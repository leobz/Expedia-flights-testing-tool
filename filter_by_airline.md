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

# Filtros por Aerolinea

En este Json tenemos 3 aerolineas  "American Airlines", "United"  y  "Delta".
Empecemos a filtrar.

### Filtrar segmentos que tengan vuelos de "American Airlines"

Cantidad de segmentos de la aerolinea "American Airlines"
```ruby
>> p filter_segmets_by_airlines(data, segments, "American Airlines").size
7
```

Segmentos de la aerolinea "American Airlines":
```ruby
>> american_airlines_segments = filter_segmets_by_airlines(data, segments, "American Airlines")
>> american_airlines_segments.each { |segment| p segment}
{<...> :airlines=>["American Airlines"]<...>}
{<...> :airlines=>["American Airlines"]<...>}
{<...> :airlines=>["American Airlines"]<...>}
{<...> :airlines=>["American Airlines"]<...>}
{<...> :airlines=>["American Airlines"]<...>}
{<...> :airlines=>["American Airlines"]<...>}
{<...> :airlines=>["American Airlines"]<...>}

```

### Filtrar segmentos que tengan vuelos de "United"

Cantidad de Vuelos de la aerolinea "United":
```ruby
>> p filter_segmets_by_airlines(data, segments, "United").size
28
```

Segmentos de la aerolinea "United":
```ruby
>> united_segments = filter_segmets_by_airlines(data, segments, "United")
>> united_segments.each { |segment| p segment}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}
{<...>:airlines=>["United", "United"]<...>}

```

### Filtrar segmentos que tengan vuelos de "Delta"

Cantidad de Vuelos de la aerolinea "Delta" :
```ruby
>> p filter_segmets_by_airlines(data, segments, "Delta").size
19
```
Segmentos de la aerolinea "Delta":
```ruby
>> delta_segments = filter_segmets_by_airlines(data, segments, "Delta")
>> delta_segments.each { |segment| p segment}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}
{<...> :airlines=>["Delta", "Delta"]<...>}

```

Nota :
En este Json en particular, cada segmento tiene una unica Aerolinea asignada para todos sus vuelos.
Pero si los segmentos tuviesen varias aerolineas, un mismo segmento puede aparecer en varios filtros
de aerolineas distintas, siempre que el las contenga.