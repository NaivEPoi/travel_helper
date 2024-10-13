import map_helper

class events: 
    def __init__(self, name, location, timeAvailability, expectedTime):
        self.name = name
        self.location = location
        self.timeAvailability = timeAvailability
        self.expectedTime = expectedTime
        self.placeID = map_helper.getPlaceID(location)