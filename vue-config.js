module.exports = {
    devServer: {
        host: 'localhost'
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                    @import "@/styles/global.scss";
                `
            }
        }
    }
}