import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DoctorHeader } from "./DoctorHeader";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Home, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

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

            {/* Header with Breadcrumb */}
            <header className="flex h-14 items-center gap-4 border-b px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              {/* Breadcrumb */}
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/" className="flex items-center gap-2 hover:text-foreground transition-colors">
                      <Home className="h-4 w-4" />
                      <span className="hidden sm:inline">Home</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {breadcrumbItems.map((item, index) => (
                    <>
                      <BreadcrumbSeparator key={`sep-${index}`} />
                      <BreadcrumbItem key={index}>
                        {item.href ? (
                          <BreadcrumbLink href={item.href} className="hover:text-foreground transition-colors">
                            {item.title}
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage className="text-foreground font-medium">
                            {item.title}
                          </BreadcrumbPage>
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