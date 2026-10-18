import Link from 'next/link';
import LegalPage, {
  getSettings,
  LegalHeading,
  LegalParagraph,
  LegalList,
  LicenceDetails,
  LEGAL_UPDATED,
} from '../../components/LegalPage';
import { getLicence, licenceStatement } from '../../lib/compliance';

export const revalidate = 60;

export const metadata = {
  title: 'Credit Guide',
  description: 'Haeden Finance credit guide — who we are, the services we provide, how we are paid, and how to make a complaint.',
  alternates: { canonical: 'https://haedenfinance.com.au/credit-guide' },
  robots: { index: true, follow: true },
};

export default async function CreditGuidePage() {
  const settings = await getSettings();
  const licence = getLicence(settings);

  return (
    <LegalPage settings={settings} title="Credit Guide" updated={LEGAL_UPDATED}>
      <LegalParagraph>
        This Credit Guide gives you important information about {licence.entity}, the credit assistance we
        provide, how we are paid, and what to do if you have a complaint. It is provided in accordance with the
        National Consumer Credit Protection Act 2009 (Cth) (the National Credit Act). Please read it carefully
        and keep it for your records.
      </LegalParagraph>

      <LegalHeading>About us</LegalHeading>
      <LegalParagraph>{licenceStatement(settings)}</LegalParagraph>
      <LicenceDetails licence={licence} />

      <LegalHeading>The services we provide</LegalHeading>
      <LegalParagraph>
        We provide credit assistance for home loans, investment loans, refinancing, construction loans, debt
        consolidation, and asset finance. We are not the lender. We help you understand your options, recommend
        loans that suit your needs, and assist you to apply.
      </LegalParagraph>

      <LegalHeading>Our lender panel</LegalHeading>
      <LegalParagraph>
        We can access loans from a panel of banks and non-bank lenders. We do not compare every lender or product
        available in the market — only those offered by lenders on our panel. A full list of our panel lenders is
        available on request.
      </LegalParagraph>
      {licence.topLenders.length > 0 ? (
        <>
          <LegalParagraph>
            The lenders with whom we most frequently arranged loans over the last financial year were:
          </LegalParagraph>
          <LegalList items={licence.topLenders} />
        </>
      ) : (
        <LegalParagraph>
          The names of the lenders with whom we most frequently arranged loans over the last financial year are
          available on request.
        </LegalParagraph>
      )}

      <LegalHeading>Acting in your best interests</LegalHeading>
      <LegalParagraph>
        As a mortgage broker, we are required by law to act in your best interests when providing credit
        assistance in relation to home loans, and to prioritise your interests if there is a conflict between
        your interests and ours.
      </LegalParagraph>

      <LegalHeading>Our responsible lending obligations</LegalHeading>
      <LegalParagraph>
        Before we recommend a loan or help you apply, we must make reasonable enquiries about your requirements,
        objectives, and financial situation, take reasonable steps to verify your financial situation, and make
        a preliminary assessment that the loan is not unsuitable for you. A loan is unsuitable if it does not
        meet your requirements and objectives, or if you would be unable to meet the repayments, or could only
        do so with substantial hardship.
      </LegalParagraph>
      <LegalParagraph>
        You can ask for a copy of our preliminary assessment for up to 7 years after the assistance is provided.
        We will give it to you free of charge within 7 business days if you ask within 2 years, or within 21
        business days if you ask after that.
      </LegalParagraph>

      <LegalHeading>Fees you may pay</LegalHeading>
      <LegalParagraph>
        If any fee is payable by you for our credit assistance, we will tell you in writing — in a credit quote —
        before we provide that assistance, and you will need to agree to it first. Lenders may charge their own
        fees, such as application, valuation, or establishment fees; these will be set out in the lender's
        documents.
      </LegalParagraph>

      <LegalHeading>How we are paid</LegalHeading>
      <LegalParagraph>When your loan settles, we may receive commissions from the lender, which may include:</LegalParagraph>
      <LegalList
        items={[
          'An upfront commission, calculated as a percentage of the loan amount drawn down',
          'An ongoing trail commission, calculated as a percentage of the outstanding loan balance',
        ]}
      />
      <LegalParagraph>
        These commissions are paid by the lender, not by you, and do not increase the amount you pay. Commission
        rates vary between lenders. Before you proceed, we will give you a credit proposal disclosure document
        that sets out the commissions we expect to receive, or how they are calculated. If someone referred you
        to us, we may pay them a referral fee, which will also be disclosed.
      </LegalParagraph>

      <LegalHeading>If you have a complaint</LegalHeading>
      <LegalParagraph>
        We want to hear from you if you are unhappy with our service. Please contact us first by email at{' '}
        {licence.email}
        {licence.phone ? ` or by phone on ${licence.phone}` : ''}. We will acknowledge your complaint within one
        business day, or as soon as practicable, and aim to give you a final response within 30 calendar days.
      </LegalParagraph>
      <LegalParagraph>
        If you are not satisfied with our response, or we have not responded within 30 days, you can lodge a
        complaint with the Australian Financial Complaints Authority (AFCA). AFCA provides fair and independent
        financial services complaint resolution that is free to consumers.
        {licence.afca ? ` Our AFCA membership number is ${licence.afca}.` : ''}
      </LegalParagraph>
      <LegalList
        items={[
          'Website: www.afca.org.au',
          'Email: info@afca.org.au',
          'Phone: 1800 931 678 (free call)',
          'Mail: Australian Financial Complaints Authority, GPO Box 3, Melbourne VIC 3001',
        ]}
      />
      <LegalParagraph>Time limits may apply to complain to AFCA, so you should act promptly.</LegalParagraph>

      <LegalHeading>Your privacy</LegalHeading>
      <LegalParagraph>
        We handle your personal and credit information in accordance with our{' '}
        <Link href="/privacy" className="underline">Privacy Policy</Link>.
      </LegalParagraph>
    </LegalPage>
  );
}
