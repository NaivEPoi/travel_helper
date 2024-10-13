import googlemaps
from datetime import datetime
from dotenv import dotenv_values

config = dotenv_values("../.env")

gmaps = googlemaps.Client(key=config["VITE_GOOGLE_MAPS_API_KEY"])

def get_place_id(address):
    result = gmaps.find_place(address, input_type="textquery")
    if result["status"] == "OK":
        if len(result["candidates"]) > 0:
            return result["candidates"][0]["place_id"]
    return None

get_place_id("1600 Amphitheatre Parkway, Mountain View, CA")

# # Geocoding an address
# geocode_result = gmaps.geocode('1600 Amphitheatre Parkway, Mountain View, CA')
# print(geocode_result)

# # Look up an address with reverse geocoding
# reverse_geocode_result = gmaps.reverse_geocode((40.714224, -73.961452))
# print(reverse_geocode_result)

# # Request directions via public transit
# now = datetime.now()
# directions_result = gmaps.directions("Sydney Town Hall",
#                                      "Parramatta, NSW",
#                                      mode="transit",
#                                      departure_time=now)
# print(directions_result)
