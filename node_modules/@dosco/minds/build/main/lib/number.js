"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.power = exports.double = void 0;
/**
 * Multiplies a value by 2. (Also a full example of TypeDoc's functionality.)
 *
 * ### Example (es module)
 * ```js
 * import { double } from 'typescript-starter'
 * console.log(double(4))
 * // => 8
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var double = require('typescript-starter').double;
 * console.log(double(4))
 * // => 8
 * ```
 *
 * @param value - Comment describing the `value` parameter.
 * @returns Comment describing the return type.
 * @anotherNote Some other value.
 */
const double = (value) => {
    return value * 2;
};
exports.double = double;
/**
 * Raise the value of the first parameter to the power of the second using the
 * es7 exponentiation operator (`**`).
 *
 * ### Example (es module)
 * ```js
 * import { power } from 'typescript-starter'
 * console.log(power(2,3))
 * // => 8
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var power = require('typescript-starter').power;
 * console.log(power(2,3))
 * // => 8
 * ```
 * @param base - the base to exponentiate
 * @param exponent - the power to which to raise the base
 */
const power = (base, exponent) => {
    /**
     * This es7 exponentiation operator is transpiled by TypeScript
     */
    return base ** exponent;
};
exports.power = power;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9udW1iZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0ksTUFBTSxNQUFNLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtJQUN0QyxPQUFPLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDbkIsQ0FBQyxDQUFDO0FBRlcsUUFBQSxNQUFNLFVBRWpCO0FBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSSxNQUFNLEtBQUssR0FBRyxDQUFDLElBQVksRUFBRSxRQUFnQixFQUFFLEVBQUU7SUFDdEQ7O09BRUc7SUFDSCxPQUFPLElBQUksSUFBSSxRQUFRLENBQUM7QUFDMUIsQ0FBQyxDQUFDO0FBTFcsUUFBQSxLQUFLLFNBS2hCIn0=