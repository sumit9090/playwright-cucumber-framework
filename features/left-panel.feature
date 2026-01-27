# Feature: Placing the order


# Scenario: Placing the order
#   Given a login to ecommerce application with "sumit.kalra121@gmail.com" and "Pass@123"
#   When Add "ZARA COAT 3" to the cart
#   Then Verify "ZARA COAT 3" is displayed in the cart


#Run in parallel (Cucumber way)
# npx cucumber-js --parallel 2
#$env:BROWSER="chromium"; npx cucumber-js --parallel 2


# Interview-ready one-liner (use this)

# “Playwright config is ignored by Cucumber.
# In Playwright+Cucumber frameworks, parallelism is handled by Cucumber and browser selection by the World.”


     Feature: Verifying the left panel options in ecommerce application
#npx cucumber-js --tags "@smoke"
   @sanity
   Scenario Outline: Verifying the left panel options
    Given a login to ecommerce application with "<email>" and "<password>"
    Then user should see left panel options

   Examples:
     | email                    | password |
     | sumit.kalra121@gmail.com | Pass@123 |
     


# when you intention is to add multiple products to cart and verify them together

#  @smoke
#  Scenario: Add multiple products to cart
#    Given a login to ecommerce application with "sumit.kalra121@gmail.com" and "Pass@123"
#   When Add "ZARA COAT 3" to the cart
#   And Add "ADIDAS ORIGINAL" to the cart
#   And Add "Automation 8" to the cart
#   Then Verify following products are displayed in the cart
#        | ZARA COAT 3     |
#        | ADIDAS ORIGINAL |
#        | Automation 8    |