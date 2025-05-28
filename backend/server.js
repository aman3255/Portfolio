export default {
  async fetch(request, env) {   // Add env param to access secrets
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "https://amandev.tech",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method === "POST" && new URL(request.url).pathname === "/api/contact") {
      const headers = {
        "Access-Control-Allow-Origin": "https://amandev.tech",
        "Content-Type": "application/json",
      };

      try {
        const data = await request.json();
        const { name, email, project, message } = data;

        if (!name || !email || !project || !message) {
          return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400, headers });
        }

        const sendGridPayload = {
          personalizations: [{ to: [{ email: "amanprajapati3205@gmail.com" }] }],
          from: { email: "amanprajapati3205@gmail.com" },   // Use valid email here
          reply_to: { email },
          subject: `New Contact Message: ${project}`,
          content: [
            {
              type: "text/html",
              value: `
                <h3>From: ${name}</h3>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${project}</p>
                <p><strong>Message:</strong><br/>${message}</p>
              `,
            },
          ],
        };

        const sendGridResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.SENDGRID_API_KEY}`,  // Use env binding here
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sendGridPayload),
        });

        if (!sendGridResponse.ok) {
          const errorText = await sendGridResponse.text();
          return new Response(JSON.stringify({ error: "Failed to send message", details: errorText }), { status: 500, headers });
        }

        return new Response(JSON.stringify({ message: "Message sent successfully!" }), { status: 200, headers });
      } catch (err) {
        return new Response(JSON.stringify({ error: "Server error: " + err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
      }
    }

    return new Response("Not found", { status: 404 });
  },
};
