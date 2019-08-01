<!--
Load the necessary libraries
>> require_relative 'response_json/filter_and_sort_functions_for_segments.rb'
<...>

-->

## Cargamos los segmentos

Primero obtenemos los itnierarios de un Json normalizado, el cual contiene itinerarios multicities de 4 ciudades. Este Json contiene 9 segmentos totales en la primera columna.
```ruby
>> data = JSON.parse(File.read('response_json/multicity_4_cities.json'))['payload']
>> first_segments =  get_segments(data)
>> p first_segments.size
9
```

Por razones practicas del test, visualizamos el primer segmento para que la lista no sea
demasiado larga. 
```ruby
>> pp first_segments.first
{:airlines=>["Delta"],
 :departure_time=>"2019-07-26T08:30:00",
 :duration=>"PT9H10M",
 :from=>"Buenos Aires",
 :to=>"Miami",
 :zid=>"ZFS-PUBLISHED-DL7612-EZE-MIA-1564140600-Y9-Y"}
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
>> second_segments.each {|segments| pp segments}
{:airlines=>["Delta"],
 :departure_time=>"2019-08-08T15:21:00",
 :duration=>"PT3H18M",
 :from=>"Miami",
 :to=>"New York",
 :zid=>"ZFS-PUBLISHED-DL2175-MIA-JFK-1565292060-UAVQA0ML-U"}
{:airlines=>["Delta"],
 :departure_time=>"2019-08-08T19:59:00",
 :duration=>"PT3H20M",
 :from=>"Miami",
 :to=>"New York",
 :zid=>"ZFS-PUBLISHED-DL2385-MIA-JFK-1565308740-TAVNA0ML-T"}
{:airlines=>["Delta"],
 :departure_time=>"2019-08-08T11:59:00",
 :duration=>"PT3H3M",
 :from=>"Miami",
 :to=>"New York",
 :zid=>"ZFS-PUBLISHED-DL2190-MIA-JFK-1565279940-KA3NA0MQ-K"}
{:airlines=>["Delta", "Delta"],
 :departure_time=>"2019-08-08T12:15:00",
 :duration=>"PT5H15M",
 :from=>"Miami",
 :to=>"New York",
 :zid=>
  "ZFS-PUBLISHED-DL2405-MIA-ATL-1565280900-KA3NA0MQ-K-DL1869-ATL-JFK-1565290680-KA3NA0MQ-K"}
{:airlines=>["Delta", "Delta"],
 :departure_time=>"2019-08-08T12:04:00",
 :duration=>"PT5H38M",
 :from=>"Miami",
 :to=>"New York",
 :zid=>
  "ZFS-PUBLISHED-DL1829-MIA-DTW-1565280240-KA3NA0MQ-K-DL1247-DTW-JFK-1565293200-KA3NA0MQ-K"}
{:airlines=>["Delta", "Delta"],
 :departure_time=>"2019-08-08T10:00:00",
 :duration=>"PT6H11M",
 :from=>"Miami",
 :to=>"New York",
 :zid=>
  "ZFS-PUBLISHED-DL1746-MIA-ATL-1565272800-KA3NA0MQ-K-DL1900-ATL-JFK-1565286060-KA3NA0MQ-K"}
{:airlines=>["Delta", "Delta"],
 :departure_time=>"2019-08-08T08:15:00",
 :duration=>"PT6H14M",
 :from=>"Miami",
 :to=>"New York",
 :zid=>
  "ZFS-PUBLISHED-DL1667-MIA-ATL-1565266500-KA3NA0MQ-K-DL2684-ATL-JFK-1565280420-KA3NA0MQ-K"}
{:airlines=>["Delta", "Delta"],
 :departure_time=>"2019-08-08T10:00:00",
 :duration=>"PT7H30M",
 :from=>"Miami",
 :to=>"New York",
 :zid=>
  "ZFS-PUBLISHED-DL1746-MIA-ATL-1565272800-KA3NA0MQ-K-DL1869-ATL-JFK-1565290680-KA3NA0MQ-K"}
{:airlines=>["Delta", "Delta"],
 :departure_time=>"2019-08-08T12:04:00",
 :duration=>"PT7H55M",
 :from=>"Miami",
 :to=>"New York",
 :zid=>
  "ZFS-PUBLISHED-DL1829-MIA-DTW-1565280240-KA3NA0MQ-K-DL3350-DTW-JFK-1565301540-KA3NA0MQ-K"}

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
>> third_segments.each {|segments| pp segments}
{:airlines=>["Delta"],
 :departure_time=>"2019-08-14T11:30:00",
 :duration=>"PT6H4M",
 :from=>"New York",
 :to=>"Seattle",
 :zid=>"ZFS-PUBLISHED-DL1191-JFK-SEA-1565796600-KAUOA0MP-K"}
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
>> pp first_choice
{:airlines=>["Delta"],
 :departure_time=>"2019-07-26T08:30:00",
 :duration=>"PT9H10M",
 :from=>"Buenos Aires",
 :to=>"Miami",
 :zid=>"ZFS-PUBLISHED-DL7612-EZE-MIA-1564140600-Y9-Y"}

```

```ruby
>> pp second_choice
{:airlines=>["Delta"],
 :departure_time=>"2019-08-08T15:21:00",
 :duration=>"PT3H18M",
 :from=>"Miami",
 :to=>"New York",
 :zid=>"ZFS-PUBLISHED-DL2175-MIA-JFK-1565292060-UAVQA0ML-U"}

```

```ruby
>> pp third_choice
{:airlines=>["Delta"],
 :departure_time=>"2019-08-14T11:30:00",
 :duration=>"PT6H4M",
 :from=>"New York",
 :to=>"Seattle",
 :zid=>"ZFS-PUBLISHED-DL1191-JFK-SEA-1565796600-KAUOA0MP-K"}

```