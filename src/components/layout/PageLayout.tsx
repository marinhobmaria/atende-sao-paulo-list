import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DoctorHeader } from "./DoctorHeader";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Home } from "lucide-react";

interface PageLayoutProps {
  children: ReactNode;
  breadcrumbItems?: Array<{
    title: string;
    href?: string;
  }>;
}

export const PageLayout = ({ children, breadcrumbItems = [] }: PageLayoutProps) => {
  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen={false}>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          
          <SidebarInset className="flex-1">
            {/* Doctor Header */}
            <DoctorHeader />

            {/* Header with Sidebar Trigger */}
            <header className="flex h-14 items-center gap-2 border-b px-6">
              <SidebarTrigger />
              
              {/* Breadcrumb */}
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/" className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {breadcrumbItems.map((item, index) => (
                    <>
                      <BreadcrumbSeparator key={`sep-${index}`} />
                      <BreadcrumbItem key={index}>
                        {item.href ? (
                          <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>{item.title}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                    </>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </header>

            {/* Main Content */}
            <main className="flex-1">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
};