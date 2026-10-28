import LegalPage, { getSettings, LegalHeading, LegalParagraph, LegalList, LEGAL_UPDATED } from '../../components/LegalPage';
import { getLicence } from '../../lib/compliance';

export const revalidate = 60;

export const metadata = {
  title: 'Privacy Policy',
  description: 'How Haeden Finance collects, uses, discloses, and protects your personal and credit information.',
  alternates: { canonical: 'https://haedenfinance.com.au/privacy' },
  robots: { index: true, follow: true },
};

export default async function PrivacyPage() {
  const settings = await getSettings();
  const licence = getLicence(settings);
  const email = licence.email;

  return (
    <LegalPage settings={settings} title="Privacy Policy" updated={LEGAL_UPDATED}>
      <LegalParagraph>
        {licence.entity} ("we", "us", "our") is committed to protecting your privacy. This policy explains how we
        collect, hold, use, and disclose your personal information and credit information in accordance with the
        Privacy Act 1988 (Cth), the Australian Privacy Principles (APPs), and the Privacy (Credit Reporting) Code.
      </LegalParagraph>

      <LegalHeading>What information we collect</LegalHeading>
      <LegalParagraph>To provide credit assistance, we may collect:</LegalParagraph>
      <LegalList
        items={[
          'Your name, contact details, date of birth, and residential history',
          'Employment, income, and tax information',
          'Financial information, including your assets, liabilities, and living expenses',
          'Credit information, including credit reports and repayment history',
          'Identification documents, as required by anti-money laundering laws',
          'Details of the property or asset you want to finance',
        ]}
      />

      <LegalHeading>How we collect it</LegalHeading>
      <LegalParagraph>
        We collect most information directly from you — in person, by phone or email, or through the enquiry form
        on our website. With your consent, we may also collect information from lenders, credit reporting bodies,
        your employer or accountant, valuers, and people who refer you to us.
      </LegalParagraph>

      <LegalHeading>Our website and enquiry forms</LegalHeading>
      <LegalParagraph>
        When you submit an enquiry on our website, the details you enter are collected through a form provided by
        our customer relationship management platform (GoHighLevel / LeadConnector) and may be emailed to us
        through an email delivery service. Our website is hosted by Vercel, and we use Vercel Web Analytics (which does not use cookies) to count page visits. Like most websites, these services may
        automatically record technical information such as your IP address, browser type, and pages visited.
      </LegalParagraph>
      <LegalParagraph>
        We use Google Analytics (Google LLC) to understand how visitors use our website, such as which pages are
        viewed and how visitors found us. Google Analytics uses cookies and receives information such as your IP
        address and device details; we do not use it to identify you. You can block cookies in your browser
        settings or install the Google Analytics opt-out browser add-on at tools.google.com/dlpage/gaoptout.
      </LegalParagraph>

      <LegalHeading>How we use your information</LegalHeading>
      <LegalList
        items={[
          'To understand your needs and assess which loans may be suitable for you',
          'To prepare and submit loan applications to lenders on your behalf',
          'To verify your identity and meet our legal and regulatory obligations',
          'To communicate with you about your application and our services',
          'To review your loan over time and let you know about options that may benefit you (you can opt out of marketing at any time)',
        ]}
      />

      <LegalHeading>Credit reporting</LegalHeading>
      <LegalParagraph>
        With your consent, we or the lenders we work with may obtain your credit report from credit reporting
        bodies, including Equifax, Experian, and illion. Each credit reporting body has a policy explaining how it
        manages credit-related information, available on its website. You can ask a credit reporting body not to
        use or disclose your credit information if you believe you have been, or are likely to be, a victim of
        fraud.
      </LegalParagraph>

      <LegalHeading>Who we share it with</LegalHeading>
      <LegalParagraph>
        We may disclose your information to lenders and their agents, credit reporting bodies, our licensee and
        aggregator, valuers, lenders' mortgage insurers, your other advisers (with your consent), our service
        providers, and government or regulatory bodies where required by law. We do not sell your personal
        information.
      </LegalParagraph>

      <LegalHeading>Disclosure overseas</LegalHeading>
      <LegalParagraph>
        Some of our service providers, such as our CRM, email, and website hosting providers, may store or process
        information outside Australia, including in the United States. We take reasonable steps to ensure these
        providers handle your information consistently with the Australian Privacy Principles.
      </LegalParagraph>
      <LegalParagraph>
        The lenders, lenders&apos; mortgage insurers, and our licensee and aggregator that we disclose your
        information to may also use service providers that store or process information overseas. Where they do,
        their own privacy policies explain which countries are involved and how your information is protected. You
        can ask us, or the relevant lender, for a copy of that policy.
      </LegalParagraph>

      <LegalHeading>Dealing with us anonymously</LegalHeading>
      <LegalParagraph>
        You can make general enquiries without identifying yourself or by using a pseudonym. However, we cannot
        provide credit assistance or submit a loan application without your personal information.
      </LegalParagraph>

      <LegalHeading>Security and retention</LegalHeading>
      <LegalParagraph>
        We take reasonable steps to protect your information from misuse, interference, loss, and unauthorised
        access, modification, or disclosure. We keep records for as long as required by law (generally 7 years)
        and then securely destroy or de-identify them. If a data breach is likely to result in serious harm to
        you, we will notify you and the Office of the Australian Information Commissioner (OAIC) as required by
        the Notifiable Data Breaches scheme.
      </LegalParagraph>

      <LegalHeading>Access and correction</LegalHeading>
      <LegalParagraph>
        You can ask to access or correct the personal information we hold about you by contacting us at {email}.
        We will respond within 30 days. If we refuse your request, we will tell you why in writing.
      </LegalParagraph>

      <LegalHeading>Complaints</LegalHeading>
      <LegalParagraph>
        If you have a concern about how we have handled your personal or credit information, please contact us at{' '}
        {email}. We will acknowledge your complaint promptly and aim to resolve it within 30 days. If you are not
        satisfied, you may complain to the Australian Financial Complaints Authority (AFCA) on 1800 931 678 or at
        www.afca.org.au, or to the OAIC on 1300 363 992 or at www.oaic.gov.au.
      </LegalParagraph>

      <LegalHeading>Contact us</LegalHeading>
      <LegalParagraph>
        For any privacy question, email us at {email}
        {licence.phone ? ` or call ${licence.phone}` : ''}.
      </LegalParagraph>
    </LegalPage>
  );
}
