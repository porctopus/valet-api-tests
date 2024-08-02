const {test, expect} = require("@playwright/test");
const {setObservationParams, isNumber} = require("../utilities/utils")
const TESTDATA = require("../data/valet-api-observations-recent-data.json")
const {recentSchema} = require("../utilities/schemas")

var Validator = require("jsonschema").Validator
Validator.prototype.customFormats.isNumber = isNumber
var v = new Validator()

TESTDATA.forEach(({ input, expected }) => {
test(`Valet API - recent observations for ${input.series}`, async({request})=> {
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
    
    // confirm the schema of the data
    for (const o of resultJSON.observations) {
        const validation = (v.validate(o, recentSchema))
        expect(validation.errors.length, validation.errors).toEqual(0)

    }
})})