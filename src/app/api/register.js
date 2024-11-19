// pages/api/register.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { firstName, lastName, email, password, iAgree } = req.body;

            // Check if the user agreed to terms and conditions
            if (!iAgree) {
                return res.status(400).json({ message: 'Please agree to the terms and conditions' });
            }

            // Send data to the Laravel API
            const laravelResponse = await fetch(`${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password }),
            });

            const data = await laravelResponse.json();

            if (!laravelResponse.ok) {
                return res.status(laravelResponse.status).json(data);
            }

            // Return success response
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
