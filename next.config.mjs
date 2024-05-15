/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '**',
            },
        ],
    },
    webpack: (config) => {
        // Add fallback for 'url' module to resolve 'node:' URIs issue
        config.resolve.fallback = {
            ...config.resolve.fallback,
            url: require.resolve("url/"),
        };

        return config;
    },
};

export default nextConfig;
