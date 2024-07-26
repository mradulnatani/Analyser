// Define renewal intervals for different asset types (in years)
const assetRenewalIntervals = {
  'Property': 30,
  'Vehicle': 10,
  'Computer': 5,
  'Furniture': 15,
  'Machinery': 20,
  // Add more asset types as needed
};

function calculateRenewalDates(acquisitionDate, assetType) {
  const acquisitionYear = new Date(acquisitionDate).getFullYear();
  const currentYear = new Date().getFullYear();
  const renewalInterval = assetRenewalIntervals[assetType] || 5; // Default to 5 years if asset type not found
  let lastRenewalYear = acquisitionYear;
  let nextRenewalYear = acquisitionYear + renewalInterval;

  // Calculate the last renewal year
  while (nextRenewalYear <= currentYear) {
    lastRenewalYear = nextRenewalYear;
    nextRenewalYear += renewalInterval;
  }

  // Calculate the time left for the next renewal
  const timeLeft = nextRenewalYear - currentYear;

  return {
    lastRenewalDate: `${lastRenewalYear}-01-01`,
    nextRenewalDate: `${nextRenewalYear}-01-01`,
    timeLeft: `${timeLeft} years`
  };
}

export default function handler(req, res) {
  const assets = [
    { acquisitionDate: '2000-01-01', assetType: 'Property' },
    { acquisitionDate: '2010-01-01', assetType: 'Vehicle' },
    { acquisitionDate: '2015-01-01', assetType: 'Computer' },
    { acquisitionDate: '2005-01-01', assetType: 'Furniture' },
    { acquisitionDate: '2000-01-01', assetType: 'Machinery' },
    // Add more assets as needed
  ];

  const responseData = assets.map(asset => {
    const { lastRenewalDate, nextRenewalDate, timeLeft } = calculateRenewalDates(asset.acquisitionDate, asset.assetType);
    return {
      name: 'Animesh Mishra',
      document: asset.assetType,
      lastRenewalDate,
      nextRenewalDate,
      timeLeft
    };
  });

  res.status(200).json(responseData);
}
