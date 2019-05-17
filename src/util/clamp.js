/**
 * Clamp a value between two bounds
 *
 * @param  {number} value Value to clamp
 * @param  {number} min   Minimum boundary
 * @param  {number} max   Maximum boundary
 * @return {number}       Clamped value
 */
export default function clamp(value, min, max) {
  return value < min ? min : value > max ? max : value;
}
