"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";

import { ToolsHeader } from "@/components/tools-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const SOURCE_PRESETS = ["facebook", "instagram", "google", "linkedin", "youtube", "mailchimp"];
const MEDIUM_PRESETS = [
  "paid_social",
  "organic_social",
  "email",
  "cpc",
  "display",
  "newsletter",
  "qr_code",
];

function sanitize(value: string) {
  return value.trim().replace(/\s+/g, "_");
}

export default function UtmBuilderPage() {
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [content, setContent] = useState("");
  const [term, setTerm] = useState("");
  const [copied, setCopied] = useState(false);

  const generatedUrl = useMemo(() => {
    if (!url.trim() || !source.trim() || !medium.trim() || !campaign.trim()) return null;

    let base = url.trim();
    if (!/^https?:\/\//i.test(base)) base = `https://${base}`;

    const params = new URLSearchParams();
    params.set("utm_source", sanitize(source));
    params.set("utm_medium", sanitize(medium));
    params.set("utm_campaign", sanitize(campaign));
    if (content.trim()) params.set("utm_content", sanitize(content));
    if (term.trim()) params.set("utm_term", sanitize(term));

    const sep = base.includes("?") ? "&" : "?";
    return base + sep + params.toString();
  }, [url, source, medium, campaign, content, term]);

  function handleReset() {
    setUrl("");
    setSource("");
    setMedium("");
    setCampaign("");
    setContent("");
    setTerm("");
    setCopied(false);
  }

  async function handleCopy() {
    if (!generatedUrl) return;

    function showCopied() {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }

    // Fall back to the legacy execCommand path when the async Clipboard API
    // is unavailable or denied (insecure context, restrictive permissions
    // policy) — execCommand runs synchronously off the trusted click and
    // isn't gated the same way.
    function fallbackCopy() {
      const textarea = document.createElement("textarea");
      textarea.value = generatedUrl!;
      textarea.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand("copy");
        showCopied();
      } catch {
        // Nothing left to fall back to — the URL is still visible and
        // selectable in the output box.
      }
      document.body.removeChild(textarea);
    }

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(generatedUrl);
        showCopied();
      } catch {
        fallbackCopy();
      }
    } else {
      fallbackCopy();
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <ToolsHeader title="UTM Builder" subtitle="Build and copy campaign tracking links." />

      <main className="mx-auto flex max-w-3xl flex-col gap-6 px-8 py-10">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          All tools
        </Link>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Campaign details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="url">
                Base URL <span className="font-normal text-muted-foreground">required</span>
              </Label>
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/page"
              />
              <p className="text-xs text-muted-foreground">Include https://</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="source">
                Source <span className="font-normal text-muted-foreground">required</span>
              </Label>
              <Input
                id="source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="e.g. facebook"
              />
              <p className="text-xs text-muted-foreground">Where the traffic comes from</p>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {SOURCE_PRESETS.map((preset) => (
                  <Badge
                    key={preset}
                    variant="outline"
                    render={<button type="button" />}
                    className="cursor-pointer rounded-full hover:bg-muted"
                    onClick={() => setSource(preset)}
                  >
                    {preset}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="medium">
                Medium <span className="font-normal text-muted-foreground">required</span>
              </Label>
              <Input
                id="medium"
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                placeholder="e.g. paid_social"
              />
              <p className="text-xs text-muted-foreground">Marketing channel type</p>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {MEDIUM_PRESETS.map((preset) => (
                  <Badge
                    key={preset}
                    variant="outline"
                    render={<button type="button" />}
                    className="cursor-pointer rounded-full hover:bg-muted"
                    onClick={() => setMedium(preset)}
                  >
                    {preset}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="campaign">
                Campaign <span className="font-normal text-muted-foreground">required</span>
              </Label>
              <Input
                id="campaign"
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
                placeholder="e.g. q3_awareness_2026"
              />
              <p className="text-xs text-muted-foreground">Use underscores, avoid spaces</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="content">
                Content <span className="font-normal text-muted-foreground">optional</span>
              </Label>
              <Input
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="e.g. banner_a"
              />
              <p className="text-xs text-muted-foreground">Ad or link variant</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="term">
                Term <span className="font-normal text-muted-foreground">optional</span>
              </Label>
              <Input
                id="term"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="e.g. opioid+prevention"
              />
              <p className="text-xs text-muted-foreground">Paid keyword (search only)</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Generated URL</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div
              className={cn(
                "min-h-14 rounded-xl border bg-muted/40 p-4 font-mono text-sm break-all",
                generatedUrl ? "border-primary/40 text-foreground" : "border-border text-muted-foreground"
              )}
            >
              {generatedUrl ?? "Fill in the required fields above to generate your UTM link."}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={handleCopy} disabled={!generatedUrl} className="w-fit">
                Copy URL
              </Button>
              <Button onClick={handleReset} variant="outline" className="w-fit">
                Reset
              </Button>
              <span
                className={cn(
                  "text-sm text-muted-foreground transition-opacity",
                  copied ? "opacity-100" : "opacity-0"
                )}
              >
                Copied to clipboard!
              </span>
            </div>
          </CardContent>
        </Card>

        <Separator />
        <p className="text-center text-xs text-muted-foreground">
          Spaces are replaced with underscores · Parameters are URL-encoded automatically
        </p>
      </main>
    </div>
  );
}
