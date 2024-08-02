const {test, expect} = require("@playwright/test");
const { setObservationParams } = require("../utilities/utils")
const TESTDATA = require("../data/valet-api-observations-date-range-data.json")


TESTDATA.forEach(({ input, expected }) => {
test(`Valet API - observations over date range for ${input.series}`, async({request})=> {
    // collect the query parameters
    let requestParams = setObservationParams(input)

    // send the request
    const ENDPOINT = `https://www.bankofcanada.ca/valet/observations/${input.series}/${input.format}`
    const response = await request.get(ENDPOINT, {params: requestParams})

    // confirm the request was successful
    expect(response.ok, `request to ${ENDPOINT} was successful`).toBeTruthy()

    // compare the response data to the expected data
    const resultJSON = await response.json()
    expect(resultJSON.terms, "terms should match expected").toEqual(expected.terms)

    expect(resultJSON.seriesDetail, `confirm result data for ${input.series} is equal to expected`).toEqual(expected.seriesDetail)
    
    for (const key in expected.responseData) {
        const expectedResponse = expected.responseData[key]
        expect(resultJSON.observations[expectedResponse.dataIndex], "confirm data record matches expected").toEqual(expectedResponse.data);
    }
})})