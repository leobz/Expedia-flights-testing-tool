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
..   pp segment
.. end
{:airlines=>["American Airlines"],
 :departure_time=>"2019-04-16T21:00:00",
 :duration=>"PT1H28M",
 :from=>"Dallas",
 :to=>"New Orleans",
 :zid=>"ZFS-WEB-AA1455-DFW-MSY-1555466400-SUAIZNM1-S"}
{:airlines=>["American Airlines"],
 :departure_time=>"2019-04-16T07:04:00",
 :duration=>"PT1H27M",
 :from=>"Dallas",
 :to=>"New Orleans",
 :zid=>"ZFS-WEB-AA138-DFW-MSY-1555416240-SUAIZNM1-S"}
{:airlines=>["American Airlines"],
 :departure_time=>"2019-04-16T18:25:00",
 :duration=>"PT1H25M",
 :from=>"Dallas",
 :to=>"New Orleans",
 :zid=>"ZFS-WEB-AA346-DFW-MSY-1555457100-SUAIZNM1-S"}
{:airlines=>["American Airlines"],
 :departure_time=>"2019-04-16T16:54:00",
 :duration=>"PT1H23M",
 :from=>"Dallas",
 :to=>"New Orleans",
 :zid=>"ZFS-WEB-AA2257-DFW-MSY-1555451640-SUAIZNM1-S"}
{:airlines=>["American Airlines"],
 :departure_time=>"2019-04-16T15:45:00",
 :duration=>"PT1H21M",
 :from=>"Dallas",
 :to=>"New Orleans",
 :zid=>"ZFS-WEB-AA2536-DFW-MSY-1555447500-SUAIZNM1-S"}

```

### Aplicamos el ordenamiento por menor duracion

```ruby
>> segments.sort!(&method(:compare_segments_by_duration))
>> segments.each do |segment|
..   pp segment
.. end
{:airlines=>["American Airlines"],
 :departure_time=>"2019-04-16T15:45:00",
 :duration=>"PT1H21M",
 :from=>"Dallas",
 :to=>"New Orleans",
 :zid=>"ZFS-WEB-AA2536-DFW-MSY-1555447500-SUAIZNM1-S"}
{:airlines=>["American Airlines"],
 :departure_time=>"2019-04-16T16:54:00",
 :duration=>"PT1H23M",
 :from=>"Dallas",
 :to=>"New Orleans",
 :zid=>"ZFS-WEB-AA2257-DFW-MSY-1555451640-SUAIZNM1-S"}
{:airlines=>["American Airlines"],
 :departure_time=>"2019-04-16T18:25:00",
 :duration=>"PT1H25M",
 :from=>"Dallas",
 :to=>"New Orleans",
 :zid=>"ZFS-WEB-AA346-DFW-MSY-1555457100-SUAIZNM1-S"}
{:airlines=>["American Airlines"],
 :departure_time=>"2019-04-16T07:04:00",
 :duration=>"PT1H27M",
 :from=>"Dallas",
 :to=>"New Orleans",
 :zid=>"ZFS-WEB-AA138-DFW-MSY-1555416240-SUAIZNM1-S"}
{:airlines=>["American Airlines"],
 :departure_time=>"2019-04-16T21:00:00",
 :duration=>"PT1H28M",
 :from=>"Dallas",
 :to=>"New Orleans",
 :zid=>"ZFS-WEB-AA1455-DFW-MSY-1555466400-SUAIZNM1-S"}
```
