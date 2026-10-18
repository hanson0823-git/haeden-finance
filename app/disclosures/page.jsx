import Link from 'next/link';
import LegalPage, {
  getSettings,
  LegalHeading,
  LegalParagraph,
  LicenceDetails,
  LEGAL_UPDATED,
} from '../../components/LegalPage';
import { getLicence, licenceStatement } from '../../lib/compliance';

export const revalidate = 60;

export const metadata = {
  title: 'Disclosures',
  description: 'Licensing details and important disclosures about Haeden Finance and the information on this website.',
  alternates: { canonical: 'https://haedenfinance.com.au/disclosures' },
  robots: { index: true, follow: true },
};

export default async function DisclosuresPage() {
  const settings = await getSettings();
  const licence = getLicence(settings);

  return (
    <LegalPage settings={settings} title="Disclosures" updated={LEGAL_UPDATED}>
      <LegalHeading>Credit licensing</LegalHeading>
      <LegalParagraph>{licenceStatement(settings)}</LegalParagraph>
      <LicenceDetails licence={licence} />
      <LegalParagraph>
        Full details of our services, how we are paid, and how to make a complaint are set out in our{' '}
        <Link href="/credit-guide" className="underline">Credit Guide</Link>.
      </LegalParagraph>

      <LegalHeading>General information only</LegalHeading>
      <LegalParagraph>
        Information on this website is general in nature and has been prepared without considering your
        objectives, financial situation, or needs. Before acting on it, you should consider whether it is
        appropriate for your circumstances. It is not tax or legal advice — please speak to a qualified adviser
        about those matters.
      </LegalParagraph>

      <LegalHeading>Lending criteria</LegalHeading>
      <LegalParagraph>
        All loan applications are subject to the relevant lender's credit assessment and approval criteria. Terms,
        conditions, fees, and charges apply. Any interest rates or figures mentioned on this website are
        indicative only and may change without notice.
      </LegalParagraph>

      <LegalHeading>Commissions and referral fees</LegalHeading>
      <LegalParagraph>
        We may receive commissions from lenders, and we may pay referral fees to people who refer clients to us.
        These amounts are disclosed in our Credit Guide and in the credit proposal disclosure document we give you
        before you proceed.
      </LegalParagraph>

      <LegalHeading>Client reviews</LegalHeading>
      <LegalParagraph>
        Reviews shown on this website are published by clients on our Google Business Profile and are displayed as
        provided by Google. We do not write, edit, or select the reviews shown.
        Each client's outcome depends on their individual circumstances, and past results are not a guarantee of
        future results.
      </LegalParagraph>

      <LegalHeading>Questions</LegalHeading>
      <LegalParagraph>
        Contact us at {licence.email} for copies of any disclosure documents.
      </LegalParagraph>
    </LegalPage>
  );
}
