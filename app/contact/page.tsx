import { metadataFor } from "@/lib/site-metadata";
import { ContactForm } from "@/components/contact-form";
import { CtaLink, EditorialSection, PageHero } from "@/components/editorial";
import { PageShell } from "@/components/site-shell";

export const metadata = metadataFor(
  "/contact",
  "Contact",
  "Contact Woosub Shin about quantitative research, financial econometrics, research engineering, or professional opportunities.",
);

const interests = ["Quantitative research", "Financial econometrics", "Volatility and risk diagnostics", "Reproducible research engineering", "Professional opportunities"] as const;

export default function ContactPage() {
  return (
    <PageShell>
      <div className="research-page">
        <PageHero
          eyebrow="Woosub Shin · Contact"
          title="A market question, a research discussion, or an opportunity."
          intro="Contact Woosub Shin about quantitative research, financial econometrics, research engineering, or professional opportunities. Messages are private."
          actions={<><a href="#message" className="research-button primary">Write a message</a><CtaLink href="mailto:woosub815@gmail.com">Email Woosub</CtaLink><CtaLink href="https://github.com/MeanyDeany" newTab>GitHub profile</CtaLink></>}
          metadata={[{ label: "Name", value: "Woosub Shin" }, { label: "Role", value: "Quantitative Researcher" }, { label: "Location", value: "Seoul, South Korea" }]}
        />
        <EditorialSection id="message" eyebrow="Private correspondence" title="Get in touch" intro="Use the form below or email woosub815@gmail.com directly.">
          <div className="grid gap-8 lg:grid-cols-[minmax(15rem,0.55fr)_minmax(0,1.45fr)] lg:items-start">
            <aside className="research-card">
              <h3>Useful topics</h3>
              <ul className="research-prose space-y-3 mt-5">{interests.map((interest) => <li key={interest}>{interest}</li>)}</ul>
              <p className="research-prose mt-6">Direct email remains available if the form service is unavailable.</p>
              <a className="site-link" href="mailto:woosub815@gmail.com">woosub815@gmail.com</a>
              <p className="research-prose mt-6">GitHub is a public profile. Research records that are not public are identified on their study pages.</p>
              <CtaLink href="https://github.com/MeanyDeany" newTab>GitHub / MeanyDeany</CtaLink>
            </aside>
            <ContactForm />
          </div>
        </EditorialSection>
      </div>
    </PageShell>
  );
}
