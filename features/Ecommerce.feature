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


#      Feature: Placing the order
# #npx cucumber-js --tags "@smoke"
#    @smoke
#    Scenario Outline: Placing the order
#      Given a login to ecommerce application with "<email>" and "<password>"
#      When Add "<productName>" to the cart
#      Then Verify "<productName>" is displayed in the cart

#    Examples:
#      | email                    | password | productName       |
#      | sumit.kalra121@gmail.com | Pass@123 | ZARA COAT 3       |
#      | sumit.kalra121@gmail.com | Pass@123 | ADIDAS ORIGINAL   |
#      | sumit.kalra121@gmail.com | Pass@123 | Automation 8     |


Feature: Placing the order
@smoke
@skip
Scenario Outline: Placing the order
  Given user logs in as "validUser"
  When user adds "<productName>" to the cart
  Then "<productName>" should be displayed in the cart

Examples:
  | productName     |
  | ZARA COAT 3     |
  | ADIDAS ORIGINAL |
  | Automation 8    |


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