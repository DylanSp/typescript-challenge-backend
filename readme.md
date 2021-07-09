# Memberstack Backend Challenge

## Preface

Hello! 👋 We're excited to be sending you **Memberstack's Backend Challenge.** Before we get into what you'll be building, we want to start by saying:

- **This code is yours**. It will be kept private and only ever used for evaluation purposes.
- **Your time is valuable**. We don't expect you to work on this for more than **2 hours**.
- **We're here to help**. If you're stuck or need clarification, please don't hesistate to reach out.

## What you'll be building / objectives

You will be building a very basic REST API to retrieve AirBnB listings.

`localhost:3000/stays` should return available AirBnB listings.

`localhost:3000/reviews` should return reviews that a specific listing has.

**The challenge is divided into the following 5 tasks:**

##### 1. Build a reusable Mongo connection.

Your API shouldn't create a new connection to the database every time a request is made. It should rather reuse a single connection.

##### 2. Add filter functionality to the `stays` endpoint

Users should be able to filter listings on the following properties:

- `bedrooms`
- `beds`
- `bathrooms`
- `amenities`

For example, the following scenarios should be possible

- Return all listings that have 3 bedrooms. Request body:
```
{
  "filters": {
    "bedrooms": {
      "eq": 3
    }
  }
}
```
- Return all listings that have 2 bedrooms and 2 bathrooms. Request body:
```
{
  "filters": {
    "bedrooms": {
      "eq": 2
    },
    "bathrooms": {
      "eq": 2
    }
  }
}
```
- Return all listings that have 4 bedrooms, 3 beds, and 3 bathrooms. Request body:
```
{
  "filters": {
    "bedrooms": {
      "eq": 4
    },
    "beds": {
      "eq": 3
    },
    "bathrooms": {
      "eq": 3
    }
  }
}
```
- Return all listings that have "Wifi", a "Kitchen", and a "Washer". Request body:
```
{
  "filters": {
    "amenities": [
      "Wifi",
      "Kitchen",
      "Washer"
    ]
  }
}
```
- Return all listings that have "Wifi" and 3 bedrooms. Request body:
```
{
  "filters": {
    "bedrooms": {
      "eq": 3
    },
    "amenities": [
      "Wifi"
    ]
  }
}
```

##### 3. Add a pagination strategy to the `stays` endpoint

There are approx. 5,600 listings. Your API shouldn't return more than 25 listings at time.

Put in place a strategy for users to retrieve listings incrementally.

##### 4. Create a `reviews` endpoint

Listings have an `_id` property. A user should be able to send the `reviews` endpoint the `_id` and retrieve a list of it's reviews.

**Reviews are stored on the listings themselves so this may seem a bit odd – the goal here is to see how you add an additional endpoint and how that uses the same mongo connection.**

##### 5. Please strongly type your project 🙂

### Note

If you run out of time, that's okay! We have left a `NOTES.md` file for you to provide an explanation for your solution, as well as give you an opportunity to tell us about what else you would built if you had more time.

## Getting started

Before you begin, please fork this project. If you choose to keep the repository prviate, please remember to invite the following Memberstack team members as collaborators: NicHaley, tbell511, and lydiahallie

The `.env` file contains the Mongo DB connection string. The database contains a `sample_airbnb` database which contains a `listingsAndReviews` collection. That is where you'll find the data you need.

Complete the above 5 tasks 🙂

If you have any questions please email `tyler@memberstack.com` Please add Backend Coding Challenge in the email subject.

## Assessment

Your code will be evaluated based:

- System architecture
- Code quality
- Notes explanation

**Code quality > completion**. An incomplete submission with strong code and explanation is better than a rushed but complete submission.
