import LegalPage, { getSettings, LegalHeading, LegalParagraph, LegalList } from '../../components/LegalPage';

export const revalidate = 60;

export const metadata = {
  title: 'Privacy Policy',
  description: 'How Haeden Finance collects, uses, and protects your personal information.',
  alternates: { canonical: 'https://haedenfinance.com.au/privacy' },
  robots: { index: true, follow: true },
};

export default async function PrivacyPage() {
  const settings = await getSettings();
  const email = settings?.email || 'hello@haedenfinance.com.au';

  return (
    <LegalPage settings={settings} title="Privacy Policy" updated="July 2026">
      <LegalParagraph>
        Haeden Finance ("we", "us", "our") is committed to protecting your privacy. This policy explains how we
        collect, hold, use, and disclose your personal information in accordance with the Privacy Act 1988 (Cth)
        and the Australian Privacy Principles (APPs).
      </LegalParagraph>

      <LegalHeading>What information we collect</LegalHeading>
      <LegalParagraph>
        To provide credit assistance, we may collect personal information including:
      </LegalParagraph>
      <LegalList
        items={[
          'Your name, contact details, and date of birth',
          'Employment and income details',
          'Financial information including assets, liabilities, and expenses',
          'Credit history and credit report information',
          'Identification documents as required by law',
        ]}
      />

      <LegalHeading>How we use your information</LegalHeading>
      <LegalParagraph>We collect and use your personal information to:</LegalParagraph>
      <LegalList
        items={[
          'Assess your eligibility for credit products and provide credit assistance',
          'Submit loan applications to lenders on your behalf',
          'Verify your identity as required under anti-money laundering laws',
          'Communicate with you about your application and our services',
          'Comply with our legal and regulatory obligations',
        ]}
      />

      <LegalHeading>Who we share it with</LegalHeading>
      <LegalParagraph>
        We may disclose your information to lenders and their agents, credit reporting bodies, our aggregator,
        professional advisers, and government bodies where required by law. We do not sell your personal
        information to third parties.
      </LegalParagraph>

      <LegalHeading>Data security</LegalHeading>
      <LegalParagraph>
        We take reasonable steps to protect your personal information from misuse, interference, loss, and
        unauthorised access, modification, or disclosure.
      </LegalParagraph>

      <LegalHeading>Access and correction</LegalHeading>
      <LegalParagraph>
        You may request access to, or correction of, the personal information we hold about you at any time by
        contacting us at {email}. We will respond within a reasonable period.
      </LegalParagraph>

      <LegalHeading>Complaints</LegalHeading>
      <LegalParagraph>
        If you have a concern about how we have handled your personal information, please contact us first at{' '}
        {email}. If you are not satisfied with our response, you may lodge a complaint with the Office of the
        Australian Information Commissioner (OAIC) at www.oaic.gov.au.
      </LegalParagraph>

      <LegalHeading>Contact us</LegalHeading>
      <LegalParagraph>
        For any privacy-related questions, contact us at {email}.
      </LegalParagraph>
    </LegalPage>
  );
}
