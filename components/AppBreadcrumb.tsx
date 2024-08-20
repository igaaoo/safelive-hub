"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Fragment } from "react";

export function AppBreadcrumb() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter((item) => item !== '');
  const pathTitle = siteConfig.mainNav.find((item) => item.href === paths[0])?.title;


  return (
    pathname !== '/login' ?
      <Breadcrumb className="mt-4 w-fit px-4  py-0 lg:px-20">
        <BreadcrumbList>
          <BreadcrumbItem key={"home"}>
            <BreadcrumbLink href="/">Estética</BreadcrumbLink>
          </BreadcrumbItem>


          {
            pathname === '/' &&
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem key={"propostas"}>
                <BreadcrumbLink href="/"
                  className={`${pathname === '/' && "underline"}`}
                >Propostas</BreadcrumbLink>
              </BreadcrumbItem>
            </>
          }



          {paths.map((path, index) => {
            const fullPath = `/${paths.slice(0, index + 1).join('/')}`;
            const itemTitle = pathTitle ||
              (siteConfig.mainNav.find((item) => item.href === path)?.type === "dropdown"
                ? siteConfig.mainNav.find((item) => item.href === path)?.links![0].title
                : path[0].toLocaleUpperCase() + path.slice(1));

            return (
              <Fragment key={fullPath}>
                <BreadcrumbSeparator key={`separator-${fullPath}`} />
                <BreadcrumbItem key={fullPath}>
                  <BreadcrumbLink href={fullPath} className="clear-both underline">
                    {itemTitle}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      :
      <></>
  );
}