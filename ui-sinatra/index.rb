require 'sinatra'


set :bind, '0.0.0.0'

get '/' do
  erb :index
end

post '/answer'  do
	erb :erb_answer
end


post '/answer'  do
	erb :erb_answer
end

__END__


@@ erb_answer
"Hola"