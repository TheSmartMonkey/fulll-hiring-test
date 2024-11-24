Feature: Park a vehicle

  Background:
    Given a fleet for user "user123"
    And a vehicle with plate number "ABC-123"
    And this vehicle is registered in the fleet

  @critical
  Scenario: Successfully park a vehicle
    Given a location with latitude 40.748817, longitude -73.985428
    When I park the vehicle "ABC-123" at this location
    Then the last known location of the vehicle should match the location

  Scenario: Can't park the vehicle at the same location twice
    Given a location with latitude 40.748817, longitude -73.985428
    And the vehicle "ABC-123" is already parked at this location
    When I try to park the vehicle "ABC-123" at this location
    Then I should be informed that the vehicle is already parked there
