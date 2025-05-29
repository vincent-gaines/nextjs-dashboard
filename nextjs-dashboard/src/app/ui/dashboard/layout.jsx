import SideNav from '@/app/ui/dashboard/sidenav';

export default function Layout({ children }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
/* In the code above:
A SideNav component is imported from the specified path (@/app/ui/dashboard/sidenav). 
It represents a sidebar navigation component. This component defines a functional component 
named Layout. The component takes a children prop, representing the content to be nested within 
the layout.
The layout is structured using Flexbox to create a responsive layout. It consists of two main 
sections:
The first section (div) contains the SideNav component, representing the sidebar navigation.
The second section (div) contains the main content area, where the actual page content ({children}) will be rendered.
The layout adjusts based on the screen size (md:flex-row   for large screens and md:flex-col for small screens). */