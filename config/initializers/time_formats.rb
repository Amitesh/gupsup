# Format to show date on already released.
Time::DATE_FORMATS[:message_time] = lambda { |time| time.strftime("%a %b %d %Y %I:%M %p %Z") }
Time::DATE_FORMATS[:api_format] = lambda { |time| time.strftime("%m/%d/%Y %H:%M:%S") }