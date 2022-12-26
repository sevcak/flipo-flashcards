function weightedRandom (items, weights) {
   /*
    * Picks a random item using weights.
    * 
    * Arguments:
    *  - items: array of items, from which one will be returned
    *  - weights: array of numbers, weights to their respective items
    * 
    * The item with the highest weight is the most probable to be returned
    * and vice-versa.
    */
   
    const cumulativeWeights = [];
    for (let i = 0; i < weights.length; i += 1) {
        cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
    }

    const randomNumber = cumulativeWeights[cumulativeWeights.length - 1] * Math.random();
    for (let i = 0; i < items.length; i += 1) {
        if (cumulativeWeights[i] > randomNumber) {
            return items[i];
        }
    }
}

export { weightedRandom };