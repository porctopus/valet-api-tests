const {test, expect} = require("@playwright/test");
const TESTDATA = require("../data/valet-api-series-group-data.json")
const ENDPOINT = `https://www.bankofcanada.ca/valet/groups/${TESTDATA.group}/${TESTDATA.format}`


test(`Valet API - series details associated with group ${TESTDATA.group}`, async({request})=> {
    // send the request
    const response = await request.get(ENDPOINT)

    // confirm the request was successful
    expect(response.ok, `request to ${ENDPOINT} was successful`).toBeTruthy()

    // compare the response data to the expected data
    const resultJSON = await response.json()
    expect(resultJSON.terms, "terms should match expected").toEqual(TESTDATA.expected.terms)
    expect(resultJSON.groupDetails, `confirm result data for ${TESTDATA.group} is equal to expected`).toEqual(TESTDATA.expected.groupDetails)
    
})