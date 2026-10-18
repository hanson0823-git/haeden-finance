// Licensing details from Sanity site settings, shared by the footer and legal pages.

export function getLicence(settings) {
  const s = settings || {};
  return {
    entity: s.legalEntityName || 'Haeden Finance',
    abn: s.abn || null,
    crn: s.creditRepNumber || null,
    licensee: s.licenseeName || null,
    acl: s.aclNumber || null,
    afca: s.afcaMemberNumber || null,
    topLenders: (s.topLenders || []).filter(Boolean),
    email: s.email || 'hello@haedenfinance.com.au',
    phone: s.phone || null,
    address: s.address || null,
  };
}

// e.g. "Haeden Finance Pty Ltd (ABN 12 345 678 901) is an authorised credit representative
// (CRN 123456) of XYZ Pty Ltd, Australian Credit Licence 987654."
export function licenceStatement(settings) {
  if (settings?.footerDisclaimer) return settings.footerDisclaimer;

  const l = getLicence(settings);
  if (!l.crn && !l.acl) {
    return `${l.entity} is an authorised credit representative. Licence details are available in our Credit Guide.`;
  }

  let text = l.entity;
  if (l.abn) text += ` (ABN ${l.abn})`;
  text += ' is an authorised credit representative';
  if (l.crn) text += ` (CRN ${l.crn})`;
  if (l.licensee || l.acl) {
    text += ` of ${l.licensee || 'its licensee'}`;
    if (l.acl) text += `, Australian Credit Licence ${l.acl}`;
  }
  return `${text}.`;
}
