require 'sinatra'
require_relative '../response_json/filter_and_sort_functions_for_segments.rb'




set :bind, '0.0.0.0'

get '/' do
  erb :index
end

post '/answer'  do
	erb :erb_answer
end


get '/answer'  do
	erb :erb_answer



  
end

post '/answer' do
	redirect to('/answer')
end

__END__

@@ erb_answer
-"Hola"

<%=  object.password(@uuid, @challenge_code)%>

data = JSON.parse(File.read('../response_json/flights.json'))
  segments = get_segments(data)
  segments = segments.take(10)
  segments.each {|s| "#{s}\n"}
