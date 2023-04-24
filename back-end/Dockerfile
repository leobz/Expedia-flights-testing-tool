FROM ruby

ENV APP_HOME /usr/src/app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

RUN gem install bundle
ADD . $APP_HOME
RUN bundle install

CMD ["ruby", "api_rest/index.rb"]
