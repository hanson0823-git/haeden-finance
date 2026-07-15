import LegalPage, { getSettings, LegalHeading, LegalParagraph, LegalList } from '../../components/LegalPage';

export const revalidate = 60;

export const metadata = {
  title: 'Credit Guide',
  description: 'Haeden Finance credit guide — who we are, the services we provide, and how we are paid.',
  alternates: { canonical: 'https://haedenfinance.com.au/credit-guide' },
  robots: { index: true, follow: true },
};

export default async function CreditGuidePage() {
  const settings = await getSettings();
  const email = settings?.email || 'hello@haedenfinance.com.au';

  return (
    <LegalPage settings={settings} title="Credit Guide" updated="July 2026">
      <LegalParagraph>
        This Credit Guide provides you with key information about Haeden Finance, the credit assistance services
        we provide, and your rights as a consumer under the National Consumer Credit Protection Act 2009 (Cth).
      </LegalParagraph>

      <LegalHeading>Who we are</LegalHeading>
      <LegalParagraph>
        Haeden Finance provides mortgage broking and credit assistance services. We operate as an authorised
        credit representative under an Australian Credit Licence. Our licence details are available on request
        and are provided in writing before we give you credit assistance.
      </LegalParagraph>

      <LegalHeading>The services we provide</LegalHeading>
      <LegalParagraph>
        We assist you to apply for home loans, investment loans, refinancing, construction loans, and related
        credit products. We are not the credit provider — we act on your behalf to identify suitable loan
        options from our panel of lenders and assist with your application.
      </LegalParagraph>

      <LegalHeading>Our lender panel</LegalHeading>
      <LegalParagraph>
        We source loans from a panel of banks and non-bank lenders. We do not compare every product available in
        the market — only those offered by lenders on our panel. A list of our panel lenders is available on
        request.
      </LegalParagraph>

      <LegalHeading>How we are paid</LegalHeading>
      <LegalParagraph>
        Our credit assistance is generally provided to you at no direct cost. We may receive commissions from
        lenders, which typically include:
      </LegalParagraph>
      <LegalList
        items={[
          'An upfront commission calculated as a percentage of the loan amount',
          'An ongoing trail commission calculated on the outstanding loan balance',
        ]}
      />
      <LegalParagraph>
        The exact commission varies by lender and product. We will disclose the commission we expect to receive
        before you accept a loan recommendation. You may request a reasonable estimate of these amounts at any
        time.
      </LegalParagraph>

      <LegalHeading>Our obligations to you</LegalHeading>
      <LegalParagraph>
        Before providing credit assistance, we are required by law to make reasonable enquiries about your
        requirements, objectives, and financial situation, and to assess that any loan we recommend is not
        unsuitable for you. A copy of our preliminary assessment is available on request within 7 years of the
        assistance being provided.
      </LegalParagraph>

      <LegalHeading>Complaints and dispute resolution</LegalHeading>
      <LegalParagraph>
        If you have a complaint about our services, please contact us first at {email} so we can try to resolve
        it. If you are not satisfied with the outcome, you may lodge a complaint with the Australian Financial
        Complaints Authority (AFCA), a free and independent external dispute resolution scheme:
      </LegalParagraph>
      <LegalList
        items={[
          'Website: www.afca.org.au',
          'Phone: 1800 931 678 (free call)',
          'Mail: GPO Box 3, Melbourne VIC 3001',
        ]}
      />

      <LegalHeading>Contact us</LegalHeading>
      <LegalParagraph>
        For a copy of our full credit guide, licence details, or any questions, contact us at {email}.
      </LegalParagraph>
    </LegalPage>
  );
}
