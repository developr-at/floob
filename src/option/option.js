import Getopt from 'node-getopt';

/**
 * Creates the schema for the parsing of the command line arguments.
 * @return Schema for the options.
 */
function createOptionSchema() {
    return new Getopt([
        ['c', 'config=ARG', 'Absolute path to config file'],
        ['h', 'help', 'Output usage information'],
        ['u', 'url=ARG', 'URL to scan']
    ]);
}

let getOpt = {};

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
        getOpt = createOptionSchema();
        let getOptOutput = getOpt.parse(args);

        return getOptOutput.options;
    },

    /**
     * Prints the help information for all available cli parameter
     */
    showHelp: () => {
        if (getOpt.showHelp) {
            getOpt.showHelp();
        }
    }
};
