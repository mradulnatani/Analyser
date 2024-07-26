export default function handler(req, res) {
    if (req.method === 'GET') {
      const maintenanceData = [
        { id: 1, asset: 'Pump A', lastMaintenance: '2024-01-15', nextMaintenance: '2024-07-15', status: 'Good' },
        { id: 2, asset: 'Generator B', lastMaintenance: '2023-11-20', nextMaintenance: '2024-05-20', status: 'Due' },
      ];
      res.status(200).json(maintenanceData);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  