import { postRoute } from "@/lib/postRoute";

const route = postRoute("reflection", "/writing/reflections");

export const revalidate = 3600;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;

export default route.Page;
