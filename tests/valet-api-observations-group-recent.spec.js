const {test, expect} = require("@playwright/test");
const {setObservationParams, isNumber} = require("../utilities/utils")
const TESTDATA = require("../data/valet-api-observations-group-recent-data.json")
const ENDPOINT = `https://www.bankofcanada.ca/valet/observations/group/${TESTDATA.input.group}/${TESTDATA.input.format}`
const {recentGroupSchema} = require("../utilities/schemas")

var Validator = require("jsonschema").Validator
Validator.prototype.customFormats.isNumber = isNumber
var v = new Validator()

test(`Valet API - recent observations for a group of series ${TESTDATA.input.group}`, async({request})=> {
    // collect the query parameters
    let requestParams = setObservationParams(TESTDATA.input)

    // send the request
    
    const response = await request.get(ENDPOINT, {params: requestParams})

    // confirm the request was successful
    expect(response.ok, `request to ${ENDPOINT} was successful`).toBeTruthy()

    // compare the response data to the expected data
    const resultJSON = await response.json()
    expect(resultJSON.terms, "terms should match expected").toEqual(TESTDATA.expected.terms)
    expect(resultJSON.seriesDetail, `confirm series data for ${TESTDATA.input.group} is equal to expected`).toEqual(TESTDATA.expected.seriesDetail)
    expect(resultJSON.groupDetail, `confirm group data for ${TESTDATA.input.group} is equal to expected`).toEqual(TESTDATA.expected.groupDetail)
    
    // confirm the schema of the data
    for (const o of resultJSON.observations) {
        const validation = (v.validate(o, recentGroupSchema))
        expect(validation.errors.length, validation.errors).toEqual(0)

    }
})