import PageQueue from './page/queue';
// import PluginManager from ...

function outputHandler(msg) {
    // do something with message
    // console.log(msg);
}

export default {
    process: (options) => {
        // Validate options

        const { url } = options;

        PageQueue.setup({ url, processResult: (output) => {
            console.log("Finished---");
            console.log(output);
        }});

        PageQueue.start();
    }
};