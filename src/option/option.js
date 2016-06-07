import Getopt from 'node-getopt';

/**
 * Creates the schema for the parsing of the command line arguments.
 * @return Schema for the options.
 */
function createOptionSchema() {
    return new Getopt([
        ['h', 'help', 'Output usage information'],
        ['u', 'url=ARG', 'URL to scan']
    ]);
}

/**
 * Wrapper for Options.
 */
export default {
    /**
     * Parses the given command line arguments into options.
     * @param {string} args Command line arguments.
     * @return Object containing the extracted options.
     */
    parse: (args) => {
        var getopt = createOptionSchema();
        var getoptOutput = getopt.parse(args);
        return getoptOutput.options;
    }
};