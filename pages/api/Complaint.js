const { Configuration, OpenAIApi } =require('openai');

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

const departments = [
  { name: 'Sanitation', keywords: ['garbage', 'waste', 'trash', 'cleaning'] },
  { name: 'Water Supply', keywords: ['water', 'pipeline', 'leakage'] },
  { name: 'Electricity', keywords: ['power', 'electricity', 'light'] },
  { name: 'Roads', keywords: ['road', 'pothole', 'street'] },
  // Add more departments as needed
];

const findDepartment = (text) => {
  for (const department of departments) {
    for (const keyword of department.keywords) {
      if (text.toLowerCase().includes(keyword.toLowerCase())) {
        return department.name;
      }
    }
  }
  return 'General Complaints'; // Default department if no match found
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { complaint } = req.body;

  if (!complaint) {
    return res.status(400).json({ error: 'Complaint text is required' });
  }

  try {
    const department = findDepartment(complaint);

    const aiResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Classify the following complaint into the appropriate department: ${complaint}\nDepartments: Sanitation, Water Supply, Electricity, Roads, General Complaints\nAnswer:`,
      max_tokens: 50,
      temperature: 0.7
    });

    const aiDepartment = aiResponse.data.choices[0].text.trim();

    res.status(200).json({ complaint, department: aiDepartment || department });
  } catch (error) {
    res.status(500).json({ error: 'Error processing the complaint', details: error.message });
  }
}
