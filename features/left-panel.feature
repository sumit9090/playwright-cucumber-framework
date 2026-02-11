Feature: Verifying the left panel options in ecommerce application

  @smoke
  Scenario Outline: Verifying the left panel options
    Given a login to ecommerce application with "<email>" and "<password>"
    Then user should see left panel options

    Examples:
      | email                    | password |
      | sumit.kalra121@gmail.com | Pass@123 |
