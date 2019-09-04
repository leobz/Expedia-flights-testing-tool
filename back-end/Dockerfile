FROM ruby

ENV APP_HOME /usr/src/app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

RUN gem install sinatra
RUN gem install sinatra-cross_origin
RUN gem install iso8601

ADD . $APP_HOME

CMD ["ruby", "api_rest/index.rb"]
