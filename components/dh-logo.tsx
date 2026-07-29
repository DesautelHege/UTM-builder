/**
 * DH logo bug.
 *
 * Path is taken verbatim from the brand asset. The fill is `currentColor`
 * rather than the asset's hardcoded #fff so the mark inherits whatever text
 * color it sits in — white on the black header, and correct anywhere else
 * it's reused.
 */
export function DhLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 271.078 149.626"
      role="img"
      aria-label="DH"
      className={className}
      fill="currentColor"
    >
      <path d="M252.943,58.121c-11.705-11.804-27.737-18.293-44.357-17.953-2.069,0-4.137.157-6.04.316V.016h-69.952v62.041c-2.369-15.379-9.744-29.548-20.982-40.312C97.554,7.457,78.228-.404,58.188.016H0v149.594h58.188c20.085.42,39.459-7.438,53.577-21.729,11.138-10.818,18.449-24.969,20.828-40.312v62.041h138.474v-47.555c.318-16.526-6.247-32.44-18.124-43.935Z" />
    </svg>
  );
}
