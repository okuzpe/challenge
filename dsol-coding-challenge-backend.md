# Wallbox (DSOL) Coding Challenge

Hey there! If you are reading this, that means that so far you like what you see, and we feel the same way! How exciting! Let's get to know each other a little better, shall we?

Since most of the time we will be working on solving some kind of problem for our users together, what better way to get to know each other, than solving a problem together?

## Our Problem

We will be starting the manufacture of a brand new charger real soon that will be able to send charging sessions data through the network.

A charging session starts when the charger's hose is conected to the EV and ends when the hose is disconnected from the EV or the EV's battery is fully charged. All the details of a charging session will be sent by the charger straightaway after that charging session has ended.

Our colleagues from Business think it is a great opportunity to be able to provide daily reports about a charger's charging activity to our charger owners. And our team's mission is to make this possible.

## The solution

We put our heads together as a team, and after hours of brainstorming, packs of empty whiteboard markers and two pizzas we found the solution! We would need to be able to have all our new chargers registered right after they are manufactured and, from all the charging sessions being constantly collected, send to each charger's owner a daily report with a brief summary of their charging activity by the end of the day.

## Your mission

(willing to accept the challenge? :detective:)

Build a service which handles the following things:

1.  registering and updating chargers
2.  linking chargers to their owners
3.  saving charging sessions data sent by chargers
4.  turning on and off the daily report send out for a specific charger
5.  triggering the send of the daily report of chargers to their respective owners email by the end of the day (more on this in the section: "Our part")

Some Help

- A charger's daily report must show:
  - the report's current date
  - the total amount of charging sessions registered by the charger that day
  - the total amount of time the charger has been charging that day

- So, make sure the payload you prepare for our email service contains all necessary information for us to render this!

## Our part

You are not alone in this, this is a team effort challenge! We will focus on building an email-service which will handle both html template generation and send out of the emails. You can mock this service for now, but please log the json payload you would send to this service to the console.

## Some final notes

- We are all developers, we love to interact directly with a REST API. No UI is needed! We'd love to be able to easily understand the API though...

- We will start testing our new fleet of chargers in a private environment, so no auth will be needed for now ;)

- We believe in 80% but 100% done, rather than 100% but 80% done. If you are short of time, feel free to leave some features out, but don't compromise on code quality.

- We work as a team so please make the code readable and maintainable and pay additional details in starting a new project

- If you run out of time, please elaborate the things you would do to take the project into production in the README

- Please use node, typescript welcome but not necessary

- If you are unsure about some details, please improvise. You have the freedom to decide.

* To turn in your code, please send us the link to yor public github repo. If for any reason you prefer not to make it public, please contact us and we'll let you know which user to invite.

## One last thing (really this time)

Have fun! :blush:
