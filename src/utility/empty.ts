/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
module phosphor.utility {

/**
 * A singleton frozen empty object.
 */
export
var emptyObject: any = Object.freeze({});


/**
 * A singleton frozen empty array.
 */
export
var emptyArray: any[] = Object.freeze([]);


/**
 * A singleton empty no-op function.
 */
export
var emptyFunction = () => { };

} // module phosphor.utility
