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
{:zid=>"ZFS-WEB-AA1455-DFW-MSY-1555466400-SUAIZNM1-S", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT1H28M", :departure_time=>"2019-04-16T21:00:00", :airlines=>["American Airlines"]}
{:zid=>"ZFS-WEB-AA138-DFW-MSY-1555416240-SUAIZNM1-S", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT1H27M", :departure_time=>"2019-04-16T07:04:00", :airlines=>["American Airlines"]}
{:zid=>"ZFS-WEB-AA346-DFW-MSY-1555457100-SUAIZNM1-S", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT1H25M", :departure_time=>"2019-04-16T18:25:00", :airlines=>["American Airlines"]}
{:zid=>"ZFS-WEB-AA2257-DFW-MSY-1555451640-SUAIZNM1-S", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT1H23M", :departure_time=>"2019-04-16T16:54:00", :airlines=>["American Airlines"]}
{:zid=>"ZFS-WEB-AA2536-DFW-MSY-1555447500-SUAIZNM1-S", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT1H21M", :departure_time=>"2019-04-16T15:45:00", :airlines=>["American Airlines"]}
{:zid=>"ZFS-WEB-AA1211-DFW-MSY-1555440240-SUAIZNM1-S", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT1H20M", :departure_time=>"2019-04-16T13:44:00", :airlines=>["American Airlines"]}
{:zid=>"ZFS-WEB-AA2607-DFW-MSY-1555429560-L0AIZRN1-L", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT1H28M", :departure_time=>"2019-04-16T10:46:00", :airlines=>["American Airlines"]}
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
{:zid=>"ZFS-PUBLISHED-UA3468-DFW-IAH-1555426200-LRA4AKDN-L-UA1131-IAH-MSY-1555443840-LRA4AKDN-L", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT6H9M", :departure_time=>"2019-04-16T09:50:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-PUBLISHED-UA5663-DFW-IAH-1555441500-LRA4AKDN-L-UA297-IAH-MSY-1555457760-LRA4AKDN-L", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT5H39M", :departure_time=>"2019-04-16T14:05:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-PUBLISHED-UA6220-DFW-IAH-1555435620-LRA4AKDN-L-UA2241-IAH-MSY-1555450800-LRA4AKDN-L", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT5H27M", :departure_time=>"2019-04-16T12:27:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-PUBLISHED-UA3724-DFW-IAH-1555411200-LRA4AKDN-L-UA1662-IAH-MSY-1555426020-LRA4AKDN-L", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT5H21M", :departure_time=>"2019-04-16T05:40:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-PUBLISHED-UA673-DFW-IAH-1555454640-LRA4AKDN-L-UA2134-IAH-MSY-1555469400-LRA4AKDN-L", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT5H14M", :departure_time=>"2019-04-16T17:44:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-PUBLISHED-UA6222-DFW-IAH-1555458900-LRA4AKDN-L-UA2134-IAH-MSY-1555469400-LRA4AKDN-L", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT4H3M", :departure_time=>"2019-04-16T18:55:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-PUBLISHED-UA5663-DFW-IAH-1555441500-LRA4AKDN-L-UA2241-IAH-MSY-1555450800-LRA4AKDN-L", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT3H49M", :departure_time=>"2019-04-16T14:05:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-PUBLISHED-UA6220-DFW-IAH-1555435620-LRA4AKDN-L-UA1131-IAH-MSY-1555443840-LRA4AKDN-L", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT3H32M", :departure_time=>"2019-04-16T12:27:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-PUBLISHED-UA3468-DFW-IAH-1555426200-LRA4AKDN-L-UA1754-IAH-MSY-1555434000-LRA4AKDN-L", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT3H25M", :departure_time=>"2019-04-16T09:50:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-PUBLISHED-UA3724-DFW-IAH-1555411200-LRA4AKDN-L-UA1238-IAH-MSY-1555419000-LRA4AKDN-L", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT3H16M", :departure_time=>"2019-04-16T05:40:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-PUBLISHED-UA673-DFW-IAH-1555454640-LRA4AKDN-L-UA2085-IAH-MSY-1555461600-LRA4AKDN-L", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT3H2M", :departure_time=>"2019-04-16T17:44:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-PUBLISHED-UA6215-DFW-IAH-1555417800-SRA7AKDN-S-UA1662-IAH-MSY-1555426020-SRA7AKDN-S", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT3H31M", :departure_time=>"2019-04-16T07:30:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-PUBLISHED-UA6215-DFW-IAH-1555417800-SRA7AKDN-S-UA1754-IAH-MSY-1555434000-SRA7AKDN-S", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT5H45M", :departure_time=>"2019-04-16T07:30:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-PUBLISHED-UA6194-DFW-IAH-1555447800-QAA0AKEY-Q-UA297-IAH-MSY-1555457760-QAA0AKEY-Q", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT3H54M", :departure_time=>"2019-04-16T15:50:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-WEB-UA3468-DFW-IAH-1555426200-LRA14FLX-L-UA1131-IAH-MSY-1555443840-LRA14FLX-L", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT6H9M", :departure_time=>"2019-04-16T09:50:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-WEB-UA5663-DFW-IAH-1555441500-LRA14FLX-L-UA297-IAH-MSY-1555457760-LRA14FLX-L", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT5H39M", :departure_time=>"2019-04-16T14:05:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-WEB-UA6220-DFW-IAH-1555435620-LRA14FLX-L-UA2241-IAH-MSY-1555450800-LRA14FLX-L", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT5H27M", :departure_time=>"2019-04-16T12:27:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-WEB-UA3724-DFW-IAH-1555411200-LRA14FLX-L-UA1662-IAH-MSY-1555426020-LRA14FLX-L", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT5H21M", :departure_time=>"2019-04-16T05:40:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-WEB-UA673-DFW-IAH-1555454640-LRA14FLX-L-UA2134-IAH-MSY-1555469400-LRA14FLX-L", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT5H14M", :departure_time=>"2019-04-16T17:44:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-WEB-UA6222-DFW-IAH-1555458900-LRA14FLX-L-UA2134-IAH-MSY-1555469400-LRA14FLX-L", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT4H3M", :departure_time=>"2019-04-16T18:55:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-WEB-UA5663-DFW-IAH-1555441500-LRA14FLX-L-UA2241-IAH-MSY-1555450800-LRA14FLX-L", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT3H49M", :departure_time=>"2019-04-16T14:05:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-WEB-UA6220-DFW-IAH-1555435620-LRA14FLX-L-UA1131-IAH-MSY-1555443840-LRA14FLX-L", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT3H32M", :departure_time=>"2019-04-16T12:27:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-WEB-UA3468-DFW-IAH-1555426200-LRA14FLX-L-UA1754-IAH-MSY-1555434000-LRA14FLX-L", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT3H25M", :departure_time=>"2019-04-16T09:50:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-WEB-UA3724-DFW-IAH-1555411200-LRA14FLX-L-UA1238-IAH-MSY-1555419000-LRA14FLX-L", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT3H16M", :departure_time=>"2019-04-16T05:40:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-WEB-UA673-DFW-IAH-1555454640-LRA14FLX-L-UA2085-IAH-MSY-1555461600-LRA14FLX-L", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT3H2M", :departure_time=>"2019-04-16T17:44:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-WEB-UA6215-DFW-IAH-1555417800-SRA07FLX-S-UA1662-IAH-MSY-1555426020-SRA07FLX-S", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT3H31M", :departure_time=>"2019-04-16T07:30:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-WEB-UA6215-DFW-IAH-1555417800-SRA07FLX-S-UA1754-IAH-MSY-1555434000-SRA07FLX-S", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT5H45M", :departure_time=>"2019-04-16T07:30:00", :airlines=>["United", "United"]}
{:zid=>"ZFS-WEB-UA6194-DFW-IAH-1555447800-QAA07FLX-Q-UA297-IAH-MSY-1555457760-QAA07FLX-Q", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT3H54M", :departure_time=>"2019-04-16T15:50:00", :airlines=>["United", "United"]}
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
{:zid=>"ZFS-PUBLISHED-DL32-DFW-ATL-1555452240-KA7NA0MA-K-DL2202-ATL-MSY-1555469760-KA7NA0MA-K", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT6H26M", :departure_time=>"2019-04-16T17:04:00", :airlines=>["Delta", "Delta"]}
{:zid=>"ZFS-PUBLISHED-DL835-DFW-ATL-1555438500-KA7NA0MA-K-DL1433-ATL-MSY-1555450800-KA7NA0MA-K", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT5H1M", :departure_time=>"2019-04-16T13:15:00", :airlines=>["Delta", "Delta"]}
{:zid=>"ZFS-PUBLISHED-DL32-DFW-ATL-1555452240-KA7NA0MA-K-DL1363-ATL-MSY-1555465980-KA7NA0MA-K", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT5H26M", :departure_time=>"2019-04-16T17:04:00", :airlines=>["Delta", "Delta"]}
{:zid=>"ZFS-PUBLISHED-DL2458-DFW-ATL-1555425300-KA7NA0MA-K-DL1402-ATL-MSY-1555441140-KA7NA0MA-K", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT5H59M", :departure_time=>"2019-04-16T09:35:00", :airlines=>["Delta", "Delta"]}
{:zid=>"ZFS-PUBLISHED-DL2053-DAL-ATL-1555448580-KA7NA0MA-K-DL1363-ATL-MSY-1555465980-KA7NA0MA-K", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT6H27M", :departure_time=>"2019-04-16T16:03:00", :airlines=>["Delta", "Delta"]}
{:zid=>"ZFS-PUBLISHED-DL2014-DAL-ATL-1555416000-KA7NA0MA-K-DL805-ATL-MSY-1555431000-KA7NA0MA-K", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT5H43M", :departure_time=>"2019-04-16T07:00:00", :airlines=>["Delta", "Delta"]}
{:zid=>"ZFS-PUBLISHED-DL886-DFW-ATL-1555443000-KA7NA0MA-K-DL1393-ATL-MSY-1555458840-KA7NA0MA-K", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT6H0M", :departure_time=>"2019-04-16T14:30:00", :airlines=>["Delta", "Delta"]}
{:zid=>"ZFS-PUBLISHED-DL1950-DAL-ATL-1555437060-KA7NA0MA-K-DL1433-ATL-MSY-1555450800-KA7NA0MA-K", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT5H25M", :departure_time=>"2019-04-16T12:51:00", :airlines=>["Delta", "Delta"]}
{:zid=>"ZFS-PUBLISHED-DL2501-DFW-ATL-1555412400-KA7NA0MA-K-DL1416-ATL-MSY-1555424760-KA7NA0MA-K", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT5H2M", :departure_time=>"2019-04-16T06:00:00", :airlines=>["Delta", "Delta"]}
{:zid=>"ZFS-PUBLISHED-DL2489-DFW-ATL-1555416300-KA7NA0MA-K-DL805-ATL-MSY-1555431000-KA7NA0MA-K", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT5H38M", :departure_time=>"2019-04-16T07:05:00", :airlines=>["Delta", "Delta"]}
{:zid=>"ZFS-PUBLISHED-DL2053-DAL-ATL-1555448580-KA7NA0MA-K-DL1393-ATL-MSY-1555458840-KA7NA0MA-K", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT4H27M", :departure_time=>"2019-04-16T16:03:00", :airlines=>["Delta", "Delta"]}
{:zid=>"ZFS-PUBLISHED-DL1946-DAL-ATL-1555427040-KA7NA0MA-K-DL1423-ATL-MSY-1555437360-KA7NA0MA-K", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT4H26M", :departure_time=>"2019-04-16T10:04:00", :airlines=>["Delta", "Delta"]}
{:zid=>"ZFS-PUBLISHED-DL2458-DFW-ATL-1555425300-KA7NA0MA-K-DL1423-ATL-MSY-1555437360-KA7NA0MA-K", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT4H55M", :departure_time=>"2019-04-16T09:35:00", :airlines=>["Delta", "Delta"]}
{:zid=>"ZFS-PUBLISHED-DL2418-DFW-ATL-1555434000-KA7NA0MA-K-DL1412-ATL-MSY-1555446000-KA7NA0MA-K", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT4H54M", :departure_time=>"2019-04-16T12:00:00", :airlines=>["Delta", "Delta"]}
{:zid=>"ZFS-PUBLISHED-DL2393-DFW-ATL-1555429800-KA7NA0MA-K-DL1402-ATL-MSY-1555441140-KA7NA0MA-K", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT4H44M", :departure_time=>"2019-04-16T10:50:00", :airlines=>["Delta", "Delta"]}
{:zid=>"ZFS-PUBLISHED-DL1946-DAL-ATL-1555427040-KA7NA0MA-K-DL1402-ATL-MSY-1555441140-KA7NA0MA-K", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT5H30M", :departure_time=>"2019-04-16T10:04:00", :airlines=>["Delta", "Delta"]}
{:zid=>"ZFS-PUBLISHED-DL2492-DFW-ATL-1555420500-KA7NA0MA-K-DL805-ATL-MSY-1555431000-KA7NA0MA-K", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT4H28M", :departure_time=>"2019-04-16T08:15:00", :airlines=>["Delta", "Delta"]}
{:zid=>"ZFS-PUBLISHED-DL2055-DAL-ATL-1555458000-KA7NA0MA-K-DL2202-ATL-MSY-1555469760-KA7NA0MA-K", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT4H50M", :departure_time=>"2019-04-16T18:40:00", :airlines=>["Delta", "Delta"]}
{:zid=>"ZFS-PUBLISHED-DL1321-DFW-ATL-1555447800-KA7NA0MA-K-DL1393-ATL-MSY-1555458840-KA7NA0MA-K", :from=>"Dallas", :to=>"New Orleans", :duration=>"PT4H40M", :departure_time=>"2019-04-16T15:50:00", :airlines=>["Delta", "Delta"]}
```

Nota :
En este Json en particular, cada segmento tiene una unica Aerolinea asignada para todos sus vuelos.
Pero si los segmentos tuviesen varias aerolineas, un mismo segmento puede aparecer en varios filtros
de aerolineas distintas, siempre que el las contenga.