const {test, expect} = require("@playwright/test");
const baseURL = "https://www.bankofcanada.ca/valet/"
const TESTDATA = require("../data/valet-api-negative-tests-data.json")

test("lists - invalid type parameter - TC001", async ({ request }) => {
    const response = await request.get(baseURL + "lists/rockets/json")
    const resultJSON = await response.json()
    expect(resultJSON, "appropriate error should be received").toEqual(TESTDATA.TC001)
});

test("lists - invalid format parameter - TC002", async ({ request }) => {
    const response = await request.get(baseURL + "lists/groups/postcard")
    const resultJSON = await response.json()
    expect(resultJSON, "appropriate error should be received").toEqual(TESTDATA.TC002)
});

test("series - invalid series parameter - TC003", async ({ request }) => {
    const response = await request.get(baseURL + "series/{*.*}/json")
    const resultJSON = await response.json()
    expect(resultJSON, "appropriate error should be received").toEqual(TESTDATA.TC003)
});

test("series - unavailable series - TC004", async ({ request }) => {
    const response = await request.get(baseURL + "series/FXJMDAUD/json")
    const resultJSON = await response.json()
    expect(resultJSON, "appropriate error should be received").toEqual(TESTDATA.TC004)
});

test("series - invalid format parameter - TC005", async ({ request }) => {
    const response = await request.get(baseURL + "series/FXAUDCAD/telegram")
    const resultJSON = await response.json()
    expect(resultJSON, "appropriate error should be received").toEqual(TESTDATA.TC005)
});

test("observations - invalid separator - TC006", async ({ request }) => {
    const response = await request.get(baseURL + "observations/FXUSDCAD-FXEURCAD/json?recent=3")
    const resultJSON = await response.json()
    expect(resultJSON, "appropriate error should be received").toEqual(TESTDATA.TC006)
});

test("observations - invalid series - TC007", async ({ request }) => {
    const response = await request.get(baseURL + "observations/o_O,FXEURCAD/json?recent=3")
    const resultJSON = await response.json()
    expect(resultJSON, "appropriate error should be received").toEqual(TESTDATA.TC007)
});

test("observations - invalid format - TC008", async ({ request }) => {
    const response = await request.get(baseURL + "observations/FXUSDCAD,FXEURCAD/email?recent=3")
    const resultJSON = await response.json()
    expect(resultJSON, "appropriate error should be received").toEqual(TESTDATA.TC008)
});

test("observations - invalid start date - TC009", async ({ request }) => {
    const response = await request.get(baseURL + "observations/FXUSDCAD,FXEURCAD/json?start_date=Y2K&end_date=2023-01-23")
    const resultJSON = await response.json()
    expect(resultJSON, "appropriate error should be received").toEqual(TESTDATA.TC009)
});

test("observations - invalid end date - TC010", async ({ request }) => {
    const response = await request.get(baseURL + "observations/FXUSDCAD,FXEURCAD/json?start_date=2023-01-23&end_date=19[-Infinity-]82-01-01")
    const resultJSON = await response.json()
    expect(resultJSON, "appropriate error should be received").toEqual(TESTDATA.TC010)
});

test("observations - start date after end date - TC011", async ({ request }) => {
    const response = await request.get(baseURL + "observations/FXUSDCAD,FXEURCAD/json?start_date=2023-07-19&end_date=2023-01-23")
    const resultJSON = await response.json()
    expect(resultJSON, "appropriate error should be received").toEqual(TESTDATA.TC011)
});

test("observations - recent interval with date range parameters - TC012", async ({ request }) => {
    const response = await request.get(baseURL + "observations/FXUSDCAD,FXEURCAD/json?start_date=2023-07-19&end_date=2023-01-23&recent=4")
    const resultJSON = await response.json()
    expect(resultJSON, "appropriate error should be received").toEqual(TESTDATA.TC012)
});

test("observations - invalid recent interval - TC013", async ({ request }) => {
    const response = await request.get(baseURL + "observations/FXUSDCAD,FXEURCAD/json?&recent=tuesday")
    const resultJSON = await response.json()
    expect(resultJSON, "appropriate error should be received").toEqual(TESTDATA.TC013)
});

test("observations - invalid recent weeks interval - TC014", async ({ request }) => {
    const response = await request.get(baseURL + "observations/FXUSDCAD,FXEURCAD/json?&recent_weeks=2&%)-$")
    const resultJSON = await response.json()
    expect(resultJSON, "appropriate error should be received").toEqual(TESTDATA.TC014)
});

test("observations - invalid recent months interval - TC015", async ({ request }) => {
    const response = await request.get(baseURL + "observations/FXUSDCAD,FXEURCAD/json?&recent_months=December")
    const resultJSON = await response.json()
    expect(resultJSON, "appropriate error should be received").toEqual(TESTDATA.TC015)
});

test("observations - invalid recent years interval - TC016", async ({ request }) => {
    const response = await request.get(baseURL + "observations/FXUSDCAD,FXEURCAD/json?&recent_years=2000's")
    const resultJSON = await response.json()
    expect(resultJSON, "appropriate error should be received").toEqual(TESTDATA.TC016)
});

test("observations - invalid order parameter - TC017", async ({ request }) => {
    const response = await request.get(baseURL + "observations/FXUSDCAD,FXEURCAD/json?&recent=4&order_dir=up(*&^%$#@!)")
    const resultJSON = await response.json()
    expect(resultJSON, "appropriate error should be received").toEqual(TESTDATA.TC017)
});