import { Quote } from 'src/app/models/quote'
import {decodeTime} from 'ulidx'
import { ulid } from 'ulidx'
export function quoteMapper( json : Record<string, any> ) : Quote {
  // well-api (https://github.com/well300/quotes-api)
  const id = ulid()
  return {
    id,
    text  : json['quote'],
    author: json['author'],
    createdAt: new Date(decodeTime(id))
  }
}
