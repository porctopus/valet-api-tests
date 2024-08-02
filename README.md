# valet-api-tests

This project is a lightweight api framework exercising the Valet API using Playwright in Javascript. A third party reporting tool, Allure, has been integrated to enable more comprehensive HTML reports to be generated after each test run. 

Some positive and negative scenarios have been included for the endpoints at https://www.bankofcanada.ca/valet/docs. While the test cases and data validation are not exhaustive, I believe the project overall demonstrates my abilities and approach.

## Playwright Tests
1. Install Allure on the machine that will run the tests (instructions can be found at https://allurereport.org/docs/install/)
1. Clone the repo
1. `npm install` in the working directory to rebuild the node modules
1. Install the Allure Report command-line tool `npm install --save-dev allure-commandline`
1. Install the Allure Playwright adapter `npm install --save-dev allure-playwright`
1. `npx playwright test` to execute the tests

To view the Allure report

1. When the test run completes, `allure generate allure-results -o allure-report --clean`
1. `allure open allure-report`

## Forex conversion rate tool
One of the tasks was to find the average Forex conversion rate for CAD to AUD for the recent 10 weeks. A tool called `avg-conversion-rate` has been provided to accomplish this

The tool can be executed from the command line
`node avg-conversion-rate.js` displays a usage message. The `help` command displays more details information about the expected parameters.
```
Usage: avg-conversion-rate [options] [command]

find the average conversion rate for two currencies over the last n weeks

Options:
  -V, --version                   output the version number
  -h, --help                      display help for command

Commands:
  avg <original> <converted> <w>  output the avg conversion rate for two specified currencies (eg. AUD, USD, CAD) over the last n weeks
  help [command]                  display help for command
  ```

  To retrieve the Forex coversion rate, provide two currencies and the number of weeks to get the average. For example,

```
% node avg-conversion-rate.js avg CAD AUD 10
The average conversion rate for CAD to AUD over the last 10 weeks is 1.0965755102040817
```

Various currencies and number of weeks can be entered (error handling is lacking in v 0.0.1, please be gentle)

```
% node avg-conversion-rate.js avg CAD usd 20
The average conversion rate for CAD to USD over the last 20 weeks is 0.7310814432989691
```

## Additional improvements
If I had continued to pursue this project, some enhancements and general improvements I would make:

- More exhaustive test cases and data validation
- Schema checking for all valid responses
- Testing the various data formats, currently only json is exercised in the tests
- Add Allure markup to improve the reports