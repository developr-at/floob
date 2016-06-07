/**
 * Adds a possibility to format a format string with additional parameters.
 * Placeholders ({0}, {1}, ...) in the format string will be replaced with the
 * given parameters at the respective positions.
 *
 * Example:
 *  - "Replace here: {0}".format(123) // Output: "Replace here: 123"
 *  - "Replace here: {0}{1}".format(123, 456) // Output: "Replace here: 123456"
 *  - "Replace here: {0}{0}".format(123) // Output: "Replace here: 123123"
 */
export function format() {
    var args = arguments;

    return this.replace(/{(\d+)}/g, (match, number) => {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match
        ;
    });
}

if (!String.prototype.format) {
    String.prototype.format = format;
}