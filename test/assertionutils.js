const expect = require('chai').expect;


function validateMissingQueryElement(response, element) {
    expect(response.body.errors).to.deep.equal([
        {
            "field": [
                element
            ],
            "location": "query",
            "messages": [
                `"${element}" is required`
            ],
            "types": [
                "any.required"
            ]
        }
    ]);
}

function validateMissingBodyElement(response, element) {
    expect(response.body.errors).to.deep.equal([
        {
            "field": [
                element
            ],
            "location": "body",
            "messages": [
                `"${element}" is required`
            ],
            "types": [
                "any.required"
            ]
        }
    ]);
}

module.exports = {
    validateMissingQueryElement,
    validateMissingBodyElement
};
