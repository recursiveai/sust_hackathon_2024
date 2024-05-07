import { expect, test } from 'vitest'
import { parseData } from './script'

const forestData = JSON.parse(JSON.stringify({
    "1985": {
        "i": 604,
        "ii": 895,
        "iii": 1263
    }
}))

const expectedParsedOutput = [{
    "year": "1985",
    "i": 604,
    "ii": 895,
    "iii": 1263
}]

test('Transforms the forest data in to the correct shape', () => {
    const parsedData = parseData(forestData)
    expect(parsedData).toEqual(expectedParsedOutput)
})

