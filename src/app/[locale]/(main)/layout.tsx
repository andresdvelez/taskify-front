import { Sidebar } from "@/modules/layout/templates/Sidebar";
import { CreateNewBtn } from "@/modules/main/components/CreateNewBtn";
import { NotificationsBtn } from "@/modules/main/components/NotificationsBtn";
import { PageTitleDescription } from "@/modules/main/components/PageTitleDescription";
import { ProjectProvider } from "@/modules/projects/providers/ProjectProvider";
import { TeamProvider } from "@/modules/team/providers/TeamProvider";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProjectProvider>
      <TeamProvider>
        <main className="flex gap-4 px-4 py-6 h-screen">
          <Sidebar />
          <Card
            as="section"
            shadow="sm"
            radius="md"
            className="px-4 py-2 w-full"
          >
            <CardHeader className="flex justify-between">
              <PageTitleDescription />
              <div className="flex items-center gap-2">
                <NotificationsBtn />
                <CreateNewBtn />
              </div>
            </CardHeader>
            <CardBody>{children}</CardBody>
          </Card>
        </main>
      </TeamProvider>
    </ProjectProvider>
  );
}
