
var loremIpsum = require('lorem-ipsum')


output = loremIpsum({
    count: 2                      // Number of words, sentences, or paragraphs to generate. 
  , units: 'sentences'            // Generate words, sentences, or paragraphs. 
  , sentenceLowerBound: 5         // Minimum words per sentence. 
  , sentenceUpperBound: 15        // Maximum words per sentence. 
  , paragraphLowerBound: 3        // Minimum sentences per paragraph. 
  , paragraphUpperBound: 7        // Maximum sentences per paragraph. 
  , format: 'plain'               // Plain text or html 
});

foo = loremIpsum({count: 2,units: 'words' })

console.log(foo)


