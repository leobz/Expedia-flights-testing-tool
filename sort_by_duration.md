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

# Ordenamiento por duracion de segmento

Primero veremos los segmentos sin aplicar el la funcion de ordenamiento
```ruby
>> segments.each do |segment|
..   p segment
.. end
{<...>:duration=>"PT1H28M"<...>}
{<...>:duration=>"PT1H27M"<...>}
{<...>:duration=>"PT1H25M"<...>}
{<...>:duration=>"PT1H23M"<...>}
{<...>:duration=>"PT1H21M"<...>}


```

### Aplicamos el ordenamiento por menor duracion

```ruby
>> segments = sort_for_shorter_duration(segments)
>> segments.each do |segment|
..   p segment
.. end
{<...>:duration=>"PT1H21M"<...>}
{<...>:duration=>"PT1H23M"<...>}
{<...>:duration=>"PT1H25M"<...>}
{<...>:duration=>"PT1H27M"<...>}
{<...>:duration=>"PT1H28M"<...>}

```
