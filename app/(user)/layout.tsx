import { AcademyProvider } from "@/context/academy-context";
import { api, Academy } from "@/lib/api";
import { UserLayoutContent } from "./user-layout-content";

export default async function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Fetch data on the server
    // This runs on the server, ensuring fast initial load and no client waterfalls
    let academies: Academy[] = [];
    try {
        academies = await api.getAcademiesWithHalls();
    } catch (error) {
        console.error("Failed to fetch initial academy data", error);
        // We gracefully handle error so the page still loads (maybe with empty data)
    }

    // Note: In Server Components, we cannot use usePathname directly if we want to be async/await for data fetching
    // BUT, layout.tsx in Next.js App Router (Server) doesn't have easy access to pathname.
    // However, since we are fetching data, we MUST be a Server Component to use async/await.
    // usePathname is Client Component only.

    // SOLUTION: We will move the "Background Logic" to a Client Component wrapper 
    // OR we will make the data fetching happen in a separate server component wrapper.
    // Given the constraints, let's keep the layout simple and assume the Client Components will handle their own specific backgrounds 
    // OR we use a Client Component for the main wrapper.
    return (
        <AcademyProvider initialData={academies}>
            <UserLayoutContent>{children}</UserLayoutContent>
        </AcademyProvider>
    );
}
