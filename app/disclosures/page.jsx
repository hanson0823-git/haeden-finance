import LegalPage, { getSettings, LegalHeading, LegalParagraph } from '../../components/LegalPage';

export const revalidate = 60;

export const metadata = {
  title: 'Disclosures',
  description: 'Important disclosures about Haeden Finance and the information on this website.',
  alternates: { canonical: 'https://haedenfinance.com.au/disclosures' },
  robots: { index: true, follow: true },
};

export default async function DisclosuresPage() {
  const settings = await getSettings();
  const email = settings?.email || 'hello@haedenfinance.com.au';

  return (
    <LegalPage settings={settings} title="Disclosures" updated="July 2026">
      <LegalHeading>Credit licensing</LegalHeading>
      <LegalParagraph>
        Haeden Finance operates as an authorised credit representative under an Australian Credit Licence. Our
        credit representative number and the licence under which we operate are disclosed in writing before we
        provide credit assistance, and are available at any time on request.
      </LegalParagraph>

      <LegalHeading>General advice warning</LegalHeading>
      <LegalParagraph>
        Any information on this website is general in nature and has been prepared without considering your
        objectives, financial situation, or needs. Before acting on any information, you should consider whether
        it is appropriate for your circumstances.
      </LegalParagraph>

      <LegalHeading>Lending criteria</LegalHeading>
      <LegalParagraph>
        All applications for credit are subject to the relevant lender's credit assessment and approval
        criteria. Terms, conditions, fees, and charges apply. Interest rates referenced on this site (if any)
        are indicative only and subject to change without notice.
      </LegalParagraph>

      <LegalHeading>Commissions and referrals</LegalHeading>
      <LegalParagraph>
        We may receive commissions from lenders whose products we recommend, and we may pay or receive referral
        fees in relation to referred business. Details are disclosed in our Credit Guide and before you accept
        any recommendation.
      </LegalParagraph>

      <LegalHeading>Testimonials</LegalHeading>
      <LegalParagraph>
        Client outcomes described on this website reflect individual circumstances. Past outcomes are not a
        guarantee of similar results, as every applicant's financial situation is different.
      </LegalParagraph>

      <LegalHeading>Questions</LegalHeading>
      <LegalParagraph>Contact us at {email} for copies of any disclosure documents.</LegalParagraph>
    </LegalPage>
  );
}
