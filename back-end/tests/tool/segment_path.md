<!--
Load the necessary libraries
>> require_relative '../../tool/filter_and_sort_functions_for_segments.rb'
<...>

-->

## Cargamos los segmentos

Primero obtenemos los itnierarios de un Json normalizado, el cual contiene itinerarios multicities de 4 ciudades. Este Json contiene 9 segmentos totales en la primera columna.
```ruby
>> data = JSON.parse(File.read('flights_data_examples/multicity_4_cities.json'))['payload']
>> first_segments =  get_segments(data)
>> p first_segments.size
9
```

Por razones practicas del test, visualizamos el primer segmento para que la lista no sea
demasiado larga. 
```ruby
>> p first_segments.first
{:zid=>"ZFS-PUBLISHED-DL7612-EZE-MIA-1564140600-Y9-Y"<...>:from=>"Buenos Aires",<...>:to=>"Miami",<...>}

```
Supongamos que elegimos este segmento, por lo tanto lo que nos interesa es su id
```ruby
>> first_choice = first_segments.first
>> first_choice_id = first_choice[:zid]

```

## Avanzar al segundo segmento
Supongamos que elegimos el primer segmento, entonces ahora, tedremos que ver los segundos segmentos disponibles a partir de la eleccion que hicimos. Diversas elecciones ocacionan diversos posibles resultados
de segundos segmentos.
Busquemos nuestros posibles segundos segmentos, a partir de la primera eleccion.
```ruby
>> second_segments = get_segments(data, [first_choice_id])  

```

Vemos que las opciones son nuevamente 9.


```ruby
>> p second_segments.size
9
```
Veamos cuales son estos 9 nuevos segmentos disponibles. 

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

Elegimos el primero de esta lista como segundo segmento

```ruby
>> second_choice = second_segments.first
>> second_choice_id = second_choice[:zid]

```

### Avanzar al tercer segmento
Como hicimos con el segundo segmento, queremos visualizar los terceros segmentos disponibles, recordando
poner como condicion los dos segmentos previamente seleccionados. 
```ruby
>> third_segments = get_segments(data, [first_choice_id, second_choice_id])   

```
Como es de esperar la lista de segmentos disponibles se acota (antes eran 9). Podemos comprobar
esto facimente

```ruby
>> p third_segments.size
1
```
Veamos cuales es este tercer segmento

```ruby
>> third_segments.each {|segments| p segments}
{<...>:from=>"New York",<...>:to=>"Seattle",<...>}

```

Como es nuestra unica opcion la elegimos
```ruby
>> third_choice = third_segments.first
>> third_choice_id = third_choice[:zid]

```

### Comprobar concordancia de segmentos

Como estos segmentos estan ordenados de forma logica, es de esperar que la llegada del segmento 1, sea la
salida del segmento 2, y que esta logica se aplique al segmento 3, etc.

```ruby
>> p first_choice
{:zid=>"ZFS-PUBLISHED-DL7612-EZE-MIA-1564140600-Y9-Y"<...>:from=>"Buenos Aires",<...>:to=>"Miami",<...>}

```

```ruby
>> p second_choice
{:zid=>"ZFS-PUBLISHED-DL2175-MIA-JFK-1565292060-UAVQA0ML-U"<...>:from=>"Miami",<...>:to=>"New York",<...>}

```

```ruby
>> p third_choice
{:zid=>"ZFS-PUBLISHED-DL1191-JFK-SEA-1565796600-KAUOA0MP-K"<...>:from=>"New York",<...>:to=>"Seattle",<...>}

```