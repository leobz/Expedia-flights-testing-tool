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


# Filtro segun cantidad de paradas (Stops)

Nota: Debemos comprobar ver que resultados filtrados suman la cantidad del total (54) 
En este caso 7 + 47 + 0 = 54

Busquemos la cantidad de vuelos con 0 stop. Estos son los llamados "No-Stops flights", en los cuales no hay
escala. Resultado: 0 segmentos encontrados

```ruby
>> p filter_segments_by_amount_of_stop(data, segments, 0).size
7
```
Busquemos la cantidad de vuelos con 1 stop . Resultado: 7 segmentos encontrados
```ruby
>> p filter_segments_by_amount_of_stop(data, segments, 1).size
47
```
Por ultimo  la cantidad de vuelos con 2 stops. Resultado 43: segmentos encontrados
```ruby
>> p filter_segments_by_amount_of_stop(data, segments, 2).size
0
```


# Filtro segun varias cantidades de paradas (lista de cantidades de Stops)
Todos los filtros suman la cantidad del total (54).
En este caso 7 + 47 + 0 = 54

```ruby
>> p filter_segments_by_list_of_amounts_of_stops(data, segments, [0, 1]).size
54
```
Busquemos la cantidad de vuelos con 1 stop . Resultado: 7 segmentos encontrados
```ruby
>> p filter_segments_by_list_of_amounts_of_stops(data, segments, [0, 2]).size
7
```
Por ultimo  la cantidad de vuelos con 2 stops. Resultado 43: segmentos encontrados
```ruby
>> p filter_segments_by_list_of_amounts_of_stops(data, segments, [1, 2]).size
47
```
