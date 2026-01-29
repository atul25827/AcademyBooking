import { api, Academy } from "@/lib/api";
import { AcademyProvider } from "@/context/academy-context";
import { AdminLayoutContent } from "./admin-layout-content";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    let academies: Academy[] = [];
    try {
        academies = await api.getAcademiesWithHalls();
    } catch (error) {
        console.error("Failed to fetch academies for admin layout", error);
    }

    return (
        <AcademyProvider initialData={academies}>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </AcademyProvider>
    );
}
