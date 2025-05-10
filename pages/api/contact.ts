import type { NextApiRequest, NextApiResponse } from 'next';

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ResponseData = {
  success: boolean;
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const formData: ContactFormData = req.body;

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Format the message for Slack
    const slackMessage = {
      text: `New Contact Form Submission:\n• Name: ${formData.name}\n• Email: ${formData.email}\n• Subject: ${formData.subject}\n• Message: ${formData.message}`,
    };

    // Send to Slack webhook
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('Slack webhook URL is not defined in environment variables');
      return res.status(500).json({ success: false, message: 'Server configuration error' });
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackMessage),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Slack webhook error:', errorText);
      return res.status(500).json({ success: false, message: 'Failed to send message' });
    }

    return res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
