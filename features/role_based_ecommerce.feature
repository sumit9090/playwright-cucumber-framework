Feature: Placing the order
@smoke
Scenario Outline: Placing the order for different users
  Given user logs in as "<role>"
  When user adds "<productName>" to the cart
  Then "<productName>" should be displayed in the cart

Examples:
  | role        | productName     |
  | superAdmin  | ZARA COAT 3     |
  | admin       | ADIDAS ORIGINAL |
  | simpleUser  | Automation 8    |