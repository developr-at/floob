import Getopt from 'node-getopt';

function createOptionSchema() {
    return new Getopt([
        ['h' , 'help', 'Output usage information'],
        ['u', 'url=ARG', 'URL to scan']
    ]);
}

export default {
    parse: (args) => {
        var getopt = createOptionSchema();
        var getoptOutput = getopt.parse(args);
        return getoptOutput.options;
    }
};