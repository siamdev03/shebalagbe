import { resend } from "@/lib/resend";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {

      booking_id,
      customer_name,
      email,
      phone,
      service,
      address,

    } = body;

    await resend.emails.send({

      from:
        "onboarding@resend.dev",

      to:
        "youradmin@gmail.com",

      subject:
        "নতুন বুকিং এসেছে 🔥",

      html: `

        <div style="font-family:sans-serif">

          <h1>
            নতুন বুকিং এসেছে 📦
          </h1>

          <p>
            <strong>ID:</strong>
            ${booking_id}
          </p>

          <p>
            <strong>নাম:</strong>
            ${customer_name}
          </p>

          <p>
            <strong>Email:</strong>
            ${email}
          </p>

          <p>
            <strong>ফোন:</strong>
            ${phone}
          </p>

          <p>
            <strong>সার্ভিস:</strong>
            ${service}
          </p>

          <p>
            <strong>ঠিকানা:</strong>
            ${address}
          </p>

        </div>

      `,

    });

    return Response.json({

      success: true,

    });

  } catch (error) {

    return Response.json({

      success: false,

    });

  }

}