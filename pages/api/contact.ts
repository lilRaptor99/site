import type { NextApiRequest, NextApiResponse } from 'next';
import { RateLimiterMemory } from 'rate-limiter-flexible';

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

const rateLimiter = new RateLimiterMemory({
  points: 2, // Number of requests allowed
  duration: 60, // Per 60 seconds (1 minute)
});

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const ipStr = Array.isArray(ip) ? ip[0] : ip;

  try {
    try {
      console.info(`Contact form request received. IP: ${ipStr}`);
      await rateLimiter.consume(ipStr);
    } catch (rejRes) {
      console.log(`Rate limit exceeded for IP: ${ipStr}`);
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.',
      });
    }

    const formData: ContactFormData = req.body;

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const slackMessage = {
      text: `New Contact Form Submission:\n• Name: ${formData.name}\n• Email: ${formData.email}\n• Subject: ${formData.subject}\n• Message: ${formData.message}`,
    };

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
