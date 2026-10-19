import * as React from "react";
import { cn } from "@/lib/utils";
export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...p }, r) => <div ref={r} className={cn("rounded-xl border bg-white text-slate-900 shadow-sm", className)} {...p} />);
export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...p }, r) => <div ref={r} className={cn("flex flex-col space-y-1.5 p-6", className)} {...p} />);
export const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...p }, r) => <h3 ref={r} className={cn("font-semibold leading-none tracking-tight", className)} {...p} />);
export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...p }, r) => <p ref={r} className={cn("text-sm text-slate-500", className)} {...p} />);
export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...p }, r) => <div ref={r} className={cn("p-6 pt-0", className)} {...p} />);
export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...p }, r) => <div ref={r} className={cn("flex items-center p-6 pt-0", className)} {...p} />);
