/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://bzdhrtermpovwfmdlyik.supabase.co/storage/v1/object/public/cabin-images/**",
      ),
      new URL("https://lh3.googleusercontent.com/a/**"),
    ],
  },
  experimental: {
    reactCompiler: false, // ✅ enable React Compiler
  },
  // output: "export",
};

export default nextConfig;
