require_relative "comparators.rb"

def sort_by_shorter_duration(segments)
  segments.sort(&method(:compare_segments_by_duration))
end

def sort_by_first_departure_date(segments)
  segments.sort(&method(:compare_segments_by_departure_date))
end

def sort_by_first_arrival_date(segments)
  segments.sort(&method(:compare_segments_by_arrival_date))
end

def sort_by_lowest_price(segments)
  segments.sort(&method(:compare_segments_by_price))
end

def sort_by_highest_price(segments)
  segments.sort(&method(:compare_segments_by_price)).reverse
end
