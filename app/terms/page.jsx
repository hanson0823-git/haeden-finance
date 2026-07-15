import LegalPage, { getSettings, LegalHeading, LegalParagraph, LegalList } from '../../components/LegalPage';

export const revalidate = 60;

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using the Haeden Finance website and services.',
  alternates: { canonical: 'https://haedenfinance.com.au/terms' },
  robots: { index: true, follow: true },
};

export default async function TermsPage() {
  const settings = await getSettings();
  const email = settings?.email || 'hello@haedenfinance.com.au';

  return (
    <LegalPage settings={settings} title="Terms of Service" updated="July 2026">
      <LegalParagraph>
        By accessing and using the Haeden Finance website ("the site"), you agree to the following terms and
        conditions. If you do not agree with these terms, please do not use the site.
      </LegalParagraph>

      <LegalHeading>General information only</LegalHeading>
      <LegalParagraph>
        The content on this site is provided for general information purposes only. It does not take into
        account your personal objectives, financial situation, or needs, and does not constitute financial,
        legal, or tax advice. Before acting on any information, you should consider its appropriateness to your
        circumstances and seek professional advice where appropriate.
      </LegalParagraph>

      <LegalHeading>No offer of credit</LegalHeading>
      <LegalParagraph>
        Nothing on this site constitutes an offer or commitment to provide credit. All loan applications are
        subject to lender assessment and approval criteria. Interest rates, fees, and product features referred
        to on this site are subject to change without notice.
      </LegalParagraph>

      <LegalHeading>Our services</LegalHeading>
      <LegalParagraph>
        Haeden Finance provides credit assistance services as a credit representative. Details of our services,
        how we are remunerated, and our dispute resolution processes are set out in our Credit Guide.
      </LegalParagraph>

      <LegalHeading>Limitation of liability</LegalHeading>
      <LegalParagraph>
        To the maximum extent permitted by law, Haeden Finance excludes all liability for any loss or damage
        arising from your use of, or reliance on, the information on this site. Where liability cannot be
        excluded, it is limited to the re-supply of the relevant services.
      </LegalParagraph>

      <LegalHeading>Intellectual property</LegalHeading>
      <LegalParagraph>
        All content on this site, including text, graphics, and logos, is owned by or licensed to Haeden Finance
        and is protected by copyright. You may not reproduce or distribute it without our written permission.
      </LegalParagraph>

      <LegalHeading>Third-party links and tools</LegalHeading>
      <LegalParagraph>
        The site may contain links to third-party websites or embedded tools (such as booking and enquiry
        forms). We are not responsible for the content or privacy practices of third parties.
      </LegalParagraph>

      <LegalHeading>Changes to these terms</LegalHeading>
      <LegalParagraph>
        We may update these terms from time to time. Continued use of the site after changes are published
        constitutes acceptance of the updated terms.
      </LegalParagraph>

      <LegalHeading>Contact</LegalHeading>
      <LegalParagraph>Questions about these terms can be sent to {email}.</LegalParagraph>
    </LegalPage>
  );
}
