/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/projects',
                permanent: true,
            },
        ];
    },
}

module.exports = nextConfig
