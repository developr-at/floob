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

        PageQueue.enqueue(url, (output) => {
            console.log("Finished---");
            console.log(output);
        });
    }
};