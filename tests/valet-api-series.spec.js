const {test, expect} = require("@playwright/test");
const TESTDATA = require("../data/valet-api-series-data.json")


TESTDATA.forEach(({ series, format, expected }) => {
test(`Valet API - series ${series}`, async({request})=> {
    // send the request
    const ENDPOINT = `https://www.bankofcanada.ca/valet/series/${series}/${format}`
    const response = await request.get(ENDPOINT)

    // confirm the request was successful
    expect(response.ok, `request to ${ENDPOINT} was successful`).toBeTruthy()

    // compare the response data to the expected data
    const resultJSON = await response.json()
    expect(resultJSON.terms, "terms should match expected").toEqual(expected.terms)
    expect(resultJSON.seriesDetails, `confirm result data for ${series} is equal to expected`).toEqual(expected.details)
    
})})