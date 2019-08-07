require 'sinatra'
require_relative '../response_json/filter_and_sort_functions_for_segments.rb'

set :bind, '0.0.0.0'

$data = JSON.parse(File.read('../response_json/flights.json'))
$segments = get_segments($data)


get '/' do
  content_type :json
  json_received = JSON.parse(request.body.read)
  filters = json_received["filters"]
  sorts = json_received["sorts"]
  segments = apply_filters($data, $segments, filters)
  segments.to_json
end


__END__

