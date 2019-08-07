require 'sinatra'
require_relative '../response_json/filter_and_sort_functions_for_segments.rb'

set :bind, '0.0.0.0'

$data = JSON.parse(File.read('../response_json/flights.json'))
$original_segments = get_segments($data)


get '/' do
  content_type :json
  json_received = JSON.parse(request.body.read)
  filters = json_received["filters"]
  sort_type = json_received["sort_type"]
  segments = apply_filters($data, $original_segments, filters)
  segments = apply_sort(segments, sort_type)
  segments.to_json
end


__END__

