/** @type {import('next').NextConfig} */
const webpack = require("webpack");

const { parsed: myEnv } = require("dotenv").config({
    path: ".env.local", // to resolve empty if .env file not found
    debug: true,
});

const nextConfig = {
    reactStrictMode: true,
    webpack(config) {
        if (process.env.NODE_ENV === "development") {
            config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
            return config;
        }
    },

    images: {
        domains: ["pbs.twimg.com"],
    },
};

module.exports = nextConfig;
