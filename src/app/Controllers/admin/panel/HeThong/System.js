module.exports = async(client, data) => {
    if (!!data) {
        if (void 0 !== data.reboot) {
            console.log("SERVER REBOOT!");
            process.exit(1);
        }
    }
};