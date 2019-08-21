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

Por razones practicas del test, seleccionaremos los 5 primeros segmentos para no hacer una lista demasiado larga.
```ruby
>> segments = segments.take(5)
>> p segments.size
5
```

# Ordenamiento por fecha de salida

Primero veremos los segmentos sin aplicar el la funcion de ordenamiento
```ruby
>> segments.each do |segment|
..   p segment
.. end
{<...> :departure_time=>"2019-04-16T21:00:00",<...>}
{<...> :departure_time=>"2019-04-16T07:04:00",<...>}
{<...> :departure_time=>"2019-04-16T18:25:00",<...>}
{<...> :departure_time=>"2019-04-16T16:54:00",<...>}
{<...> :departure_time=>"2019-04-16T15:45:00",<...>}


```

### Aplicamos el ordenamiento por menor duracion

```ruby
>> segments = sort_by_first_departure_date(segments)
>> segments.each do |segment|
..   p segment
.. end
{<...> :departure_time=>"2019-04-16T07:04:00",<...>}
{<...> :departure_time=>"2019-04-16T15:45:00",<...>}
{<...> :departure_time=>"2019-04-16T16:54:00",<...>}
{<...> :departure_time=>"2019-04-16T18:25:00",<...>}
{<...> :departure_time=>"2019-04-16T21:00:00",<...>}

```
