import ImageKit from "imagekit";

export const imagekit = new ImageKit({
    publicKey : import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
    privateKey : import.meta.env.VITE_IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : import.meta.env.VITE_IMAGEKIT_URLENDPOINT,
});