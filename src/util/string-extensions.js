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