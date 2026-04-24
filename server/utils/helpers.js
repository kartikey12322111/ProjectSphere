/**
 * Common Helper Utilities
 */

/**
 * Format date to a readable string
 */
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

/**
 * Generate a slug from a string
 */
export const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w-]+/g, "") // Remove all non-word chars
        .replace(/--+/g, "-"); // Replace multiple - with single -
};

/**
 * Capitalize first letter of a string
 */
export const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Pick specific keys from an object
 */
export const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};

/**
 * Calculate progress percentage
 */
export const calculateProgress = (completed, total) => {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
};
