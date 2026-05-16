import type { Metadata } from "next";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { CTAGroup } from "@/components/primitives/CTAGroup";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { SITE_URL, OG_IMAGES, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Kobbopay pricing depends on rails, volume, operating model, and merchant requirements. Request a proposal — no public fee table until commercially approved.",
  alternates: { canonical: `${SITE_URL}/pricing` },
  openGraph: {
    title: "Pricing — Kobbopay",
    description: "Request a Kobbopay proposal based on rails, volume, and operating model.",
    url: `${SITE_URL}/pricing`,
    type: "website",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Kobbopay",
    description: "Pricing is tailored — request a proposal.",
    images: [OG_IMAGE.url],
  },
};

export default function PricingPage() {
  return (
    <>
      <Section tone="default" className="pt-10 sm:pt-16">
        <Container>
          <h1 className="text-display font-semibold tracking-tight text-primary">Pricing</h1>
          <p className="mt-4 max-w-3xl text-body text-muted">
            Pricing depends on rails, volume, operating model, and merchant requirements. We do not
            publish a public fee grid on this marketing site until numbers are approved for your
            segment and contract.
          </p>
        </Container>
      </Section>

      <Section tone="muted">
        <Container className="space-y-8">
          <Card interactive>
            <h2 className="text-h2 font-semibold text-primary">What drives a proposal</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
              <li>Which <strong className="text-primary">selected rails</strong> you need enabled (availability is environment-dependent).</li>
              <li>Expected payment volume and peak throughput.</li>
              <li>Operational requirements (support, onboarding, monitoring expectations).</li>
              <li>Integration complexity and documentation needs.</li>
            </ul>
          </Card>

          <div>
            <h2 className="text-h2 font-semibold text-primary">Request a proposal</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Tell us what you are building and what rails matter. We will respond with next steps
              appropriate to your use case.
            </p>
            <CTAGroup className="mt-6">
              <Link href="/contact#merchant-intake" variant="button-primary" className="no-underline" conv="request_access_click">
                Request access
              </Link>
              <Link href="/features" variant="button-secondary" className="no-underline">
                Review features
              </Link>
            </CTAGroup>
          </div>

          <p className="text-sm text-muted">
            For technical context:{" "}
            <Link href="/docs">
              Docs
            </Link>
            {" · "}
            <Link href="/security">Security</Link>
            {" · "}
            <Link href="/contact#merchant-intake" conv="request_access_click">
              Request access
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
