const {test, expect} = require("@playwright/test");
const { setObservationParams } = require("../utilities/utils")
const TESTDATA = require("../data/valet-api-observations-group-date-range-data.json")
const ENDPOINT = `https://www.bankofcanada.ca/valet/observations/group/${TESTDATA.input.group}/${TESTDATA.input.format}`

test(`Valet API - observations of a group of series over a specified date range for ${TESTDATA.input.group}`, async({request})=> {
    // collect the query parameters
    let requestParams = setObservationParams(TESTDATA.input)

    // send the request
    const response = await request.get(ENDPOINT, {params: requestParams})

    // confirm the request was successful
    expect(response.ok, `request to ${ENDPOINT} was successful`).toBeTruthy()

    // compare the response data to the expected data
    const resultJSON = await response.json()
    expect(resultJSON.terms, "terms should match expected").toEqual(TESTDATA.expected.terms)

    expect(resultJSON.seriesDetail, `confirm series detail data for ${TESTDATA.input.group} is equal to expected`).toEqual(TESTDATA.expected.seriesDetail)
    expect(resultJSON.groupDetail, `confirm group detail data for ${TESTDATA.input.group} is equal to expected`).toEqual(TESTDATA.expected.groupDetail)

    for (const key in TESTDATA.expected.responseData) {
        const expectedResponse = TESTDATA.expected.responseData[key]
        expect(resultJSON.observations[expectedResponse.dataIndex], "confirm data record matches expected").toEqual(expectedResponse.data);
    }
})