import map_helper

class Event: 
    def __init__(self, name, location, timeAvailability, expectedTime):
        self.name = name
        self.location = location
        self.timeAvailability = timeAvailability
        self.expectedTime = expectedTime
        self.placeID = map_helper.get_place_id(location)
        print(self.placeID)