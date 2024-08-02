const {test, expect} = require("@playwright/test");
const TESTDATA = require("../data/valet-api-lists-data.json")
const ENDPOINT = "https://www.bankofcanada.ca/valet/lists/groups/json"


test("Valet API - lists", async({request})=> {
    // send the request    
    const response = await request.get(ENDPOINT)

    // confirm the request was successful
    expect(response.ok, `request to ${ENDPOINT} was successful`).toBeTruthy()

    // compare the response data to the expected data
    const resultJSON = await response.json()
    expect(resultJSON.terms, "terms should match expected").toEqual(TESTDATA.terms)

    for (const key in TESTDATA.groups) {
        // check if the returned keys are in the expected data object and confirm the data is correct
        expect(resultJSON.groups.hasOwnProperty(key), `confirm expected key ${key} is in response`).toEqual(true)
        expect(resultJSON.groups[key], `confirm result data for ${key} is equal to expected`).toEqual(TESTDATA.groups[key])
    }
})