/** @type {import('next').NextConfig} */
const webpack = require("webpack");

const { parsed: myEnv } = require("dotenv").config({
    path: ".env.local",
    debug: true,
});

const nextConfig = {
    reactStrictMode: true,
    webpack(config) {
        config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
        return config;
    },
    images: {
        domains: ["pbs.twimg.com"],
    },
};

module.exports = nextConfig;
