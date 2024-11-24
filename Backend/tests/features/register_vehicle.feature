Feature: Register a vehicle

  @critical
  Scenario: I can register a vehicle
    Given a fleet for user "user123"
    And a vehicle with plate number "ABC-123"
    When I register this vehicle into the fleet
    Then the fleet should include the vehicle

  Scenario: I can't register the same vehicle twice
    Given a fleet for user "user123"
    And a vehicle with plate number "ABC-123"
    And this vehicle is already registered in the fleet
    When I try to register the vehicle again
    Then I should be informed that the vehicle is already registered

  Scenario: Same vehicle can belong to more than one fleet
    Given a fleet for user "user123"
    And another fleet for user "user456"
    And a vehicle with plate number "ABC-123"
    And this vehicle is registered in the fleet of "user456"
    When I register this vehicle in the fleet of "user123"
    Then the fleet of "user123" should include the vehicle
