import { Quote } from 'src/app/models/quote'
import { ulid } from 'ulidx'
export function quoteMapper( json : Record<string, any> ) : Quote {
  // well-api (https://github.com/well300/quotes-api)
  return {
    id    : ulid(),
    text  : json['quote'],
    author: json['author'],
    createdAt: new Date()
  }
}
