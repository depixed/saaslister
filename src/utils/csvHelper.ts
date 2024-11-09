export const generateSampleCSV = () => {
  // Helper to escape CSV values properly
  const escapeCSV = (value: string | number | boolean) => {
    const stringValue = String(value);
    // If value contains comma, quote, or newline, wrap in quotes and escape existing quotes
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  const headers = [
    'name',
    'url',
    'da',
    'pa',
    'dr',
    'niches',
    'traffic',
    'isPaid',
    'logo',
    'description',
    'linkType'
  ];

  const sampleData = [
    {
      name: 'Example Directory',
      url: 'https://example.com',
      da: 85,
      pa: 70,
      dr: 82,
      niches: 'Tech, Marketing, SEO',
      traffic: 50000,
      isPaid: true,
      logo: 'https://example.com/logo.png',
      description: 'A comprehensive business directory',
      linkType: 'Dofollow'
    },
    {
      name: 'Business Listings',
      url: 'https://business-listings.com',
      da: 75,
      pa: 65,
      dr: 78,
      niches: 'Business, Finance, Startups',
      traffic: 30000,
      isPaid: false,
      logo: 'https://business-listings.com/logo.png',
      description: 'Premium business listing directory',
      linkType: 'Nofollow'
    }
  ];

  const rows = sampleData.map(row => 
    [
      row.name,
      row.url,
      row.da,
      row.pa,
      row.dr,
      row.niches,
      row.traffic,
      row.isPaid,
      row.logo,
      row.description,
      row.linkType
    ].map(escapeCSV).join(',')
  );

  return `${headers.join(',')}\n${rows.join('\n')}`;
};