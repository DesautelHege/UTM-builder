import { DhLogo } from "@/components/dh-logo";

export function ToolsHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    // Required DH brand surface: black bar, white text. Per the style guide
    // this must not be navy, slate, gray, white, gradient or translucent.
    <header className="flex items-center gap-4 bg-[#010202] px-8 py-6 text-white">
      <DhLogo className="h-8 w-auto shrink-0" />
      <div className="min-w-0">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-white/70">{subtitle}</p>
      </div>
    </header>
  );
}
