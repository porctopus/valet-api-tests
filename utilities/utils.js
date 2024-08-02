exports.setObservationParams = function setObservationParams(input) {
    /**
     * parses an input object to set params for the observations endpoint
     * @param {object} input - an object containing the desired parameters
     */

    let params = {}

    if (input.hasOwnProperty("startDate")) {
        params.start_date = input.startDate
    }

    if (input.hasOwnProperty("endDate")) {
        params.end_date = input.endDate
    }

    if (input.hasOwnProperty("recent")) {
        params.recent = input.recent
    }

    if (input.hasOwnProperty("recentWeeks")) {
        params.recent_weeks = input.recentWeeks
    }

    if (input.hasOwnProperty("recentMonths")) {
        params.recent_months = input.recentMonths
    }

    if (input.hasOwnProperty("recentYears")) {
        params.recent_years = input.recentYears
    }

    if (input.hasOwnProperty("order")) {
        params.order = input.order
    }

    return params
}

exports.isNumber = function isNumber(value) {
    /**
     * returns whether the given value is a number
     * @param {*} value the value to check 
     */

    return !isNaN(Number(value));
}