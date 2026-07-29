import Link from "next/link";
import { FileText, Layers, Link2, type LucideIcon } from "lucide-react";

import { ToolsHeader } from "@/components/tools-header";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Tool {
  title: string;
  description: string;
  href: string;
  external: boolean;
  cta: string;
  icon: LucideIcon;
}

const tools: Tool[] = [
  {
    title: "Word document stylizer",
    description: "Turn pasted text or a draft .docx into a DH-branded, editable Word memo.",
    href: "https://dh-doc-brander.vercel.app",
    external: true,
    cta: "Open tool",
    icon: FileText,
  },
  {
    title: "Website content template builder",
    description: "Turn a wireframe or prototype into structured, ready-to-review page content.",
    href: "https://wireframe-to-content.wearedh.com",
    external: true,
    cta: "Open tool",
    icon: Layers,
  },
  {
    title: "UTM Builder",
    description: "Build and copy campaign tracking links with DH's standard UTM parameters.",
    href: "/utm/",
    external: false,
    cta: "Open tool",
    icon: Link2,
  },
 
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <ToolsHeader title="DH Tools" subtitle="Internal tools for the DH team!" />

      <main className="mx-auto max-w-5xl px-8 py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {tools.map((tool) => (
            <Card key={tool.title} className="rounded-2xl shadow-sm">
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <tool.icon className="size-5" />
                </div>
                <CardTitle className="text-base">{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href={tool.href}
                  target={tool.external ? "_blank" : undefined}
                  rel={tool.external ? "noopener noreferrer" : undefined}
                  className={cn(buttonVariants({ variant: "default" }), "w-fit")}
                >
                  {tool.cta}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
