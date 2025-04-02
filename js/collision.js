// js/collision.js

/**
 * Simple Axis-Aligned Bounding Box (AABB) collision detection.
 * (Currently not used in the simple click-to-score input logic)
 */
export function checkCollision(element1, element2) {
    if (!element1 || !element2) {
        return false;
    }
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    const horizontalOverlap = rect1.left < rect2.right && rect1.right > rect2.left;
    const verticalOverlap = rect1.top < rect2.bottom && rect1.bottom > rect2.top;
    return horizontalOverlap && verticalOverlap;
}
