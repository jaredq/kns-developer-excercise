# Developer Exercise

This exercise is designed to demonstrate a candidate's abilities across a range of competencies in software development (The applicant can pick any language of their preference)

## Instructions

1. Fork the repository
2. Implement a solution of the `Requirements` (feel free to use any helper packages/frameworks that you think think will be of help)
3. Share the forked repository

## "Business" Requirements

- Create a basic Groceries Shop till which can `scan` fruits and vegetables of different types, producing a numeric result/bill in the end. Assume the currency is called `aws` and there is `100 cloud ('c' for short)` in 1 aws
- Apart from simply adding the value of each product, the till should contain logic for the following special deals:
  - `2 for 3` - for a given selection of items (customer buys 3 items but only pays for the value of 2 of them, the cheapest one is free). In case there are more than 3 items that are included in the `2 for 3` deal, the first 3 items are included.
    Example Deal ["banana", "orange", "tomato"], example items scanned ["banana", "orange", "orange", "tomato"] - the tomato is not included in the discount (the cheaper of `banana` or `orange` will be subtracted)
  - `buy 1 get 1 half price` - for a given selection of items (if the customer buys a given product under such offer, they receive a 50% reduction in the price of a second item of the same type)
- The till should be `programmable` so that whoever runs it can define 2 inputs:
  - The list of items supported by the till - each item with a given "price", "name"
  - Once a new item is added to the till, the administrator should be able to add it to any of the 2 special deals defined above
  - You should be able to scan a list of items and see the end price (any special deal discounts should be subtracted)

### Example:

Input groceries:

| Product | Price |
| ------- | :---: |
| apple   |  50c  |
| banana  |  40c  |
| tomato  |  30c  |
| potato  |  26c  |

Input deals:

- `2 for 3` - ["apple", "banana", "tomato"]
- `buy 1 get 1 half price` - potato

Example scanned customer basket: "apple", "banana", "banana", "potato", "tomato", "banana", "potato"

Expected Output: `1 aws and 99 clouds`
Explanation:

The items are processed(Scanned) in order:

- "apple", "banana", "banana" are picked up for the `2 for 3` deal and 1 of the bananas is free - total cost `90c`

- "potato", "tomato", "banana", "potato" are left. There is a `buy 1 get 1 half price` for potatoes, meaning the second potato will be half price (13c) so it will be `39c` for both

- The other 2 items scanned `tomato` and `banana` are not part of any deals so they are charged their basic price `70c` total

The total amount the is equal to: `90c + 39c + 70c = 1 aws and 99 clouds` (199 clouds = 1.99 aws)

## Grading

You will be scored on the following:

- Code cleanliness and ease of understandability
- Code tests
- Code reusability
- Code modularity (i.e. ease of extension)
- Documentation

## Demonstrable concepts

You are free to make your solution to this exercise as simple or as complicated as you want based off the above criteria. The end result can come in the for of either of the options below:

- REST/HTTP API
- User interface (web app)
- Application CLI

## Exercise solution for REST/HTTP API

- This solution exercises REST/HTTP API built with the Nest.JS framework and Postgres.
- The local development environment can run in Docker container with the docker-compose script.
- This project combines the pricing and discounting services, but does not include order management, etc. It's designed to be part of the entire shop system.

## Running services

- Install Docker engine, docker-compose and Yarn cli if not yet
- Make a directory named 'data' under the project root directory, this is for storing the data files of postgres database permanently. Its location can be changed in docker-compose.yml
- Run 'docker-compose up'
- Import `./kns-dev-test.postman_collection.json` and `./kns-local.postman_environment.json` into PostMan
- The default `api_host` is 'http://localhost:3000', the env var PORT can be changed in docker-compose.yml
- Run all the examples under the `products/saveProduct` and `discounts/createDiscount` APIs. Each product has its name and price, and each discount has product name, discount code, start time and end time of validity period. The validity period for the same product cannot overlap. However, different discounts can be applied to the same product for different validity periods.
- Try the examples under the `scan` APIs, include the example basket from this exercise.
- Run unit test with `yarn test`
- Run e2e test with `yarn test:e2e`

## TODO

- To use a logger like winston
- To cache the prices of products, e.g. Redis
- To unify the field name for product name, reuse the ProductItem class.
- To unify the data structure of the exceptional response and the successful response
- To add more unit test and e2e test cases, improve the coverage.
- To build an API Doc and client web app using React and Next.JS
- To refine the project file structure
