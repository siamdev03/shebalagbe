import {

  Html,
  Body,
  Container,
  Heading,
  Text,
  Section,

} from "@react-email/components";

type Props = {

  customerName: string;

  bookingId: string;

  providerName: string;

  providerPhone: string;

};

export default function BookingConfirmationEmail({

  customerName,
  bookingId,
  providerName,
  providerPhone,

}: Props) {

  return (

    <Html>

      <Body
        style={{
          backgroundColor: "#0f172a",
          padding: "40px",
          fontFamily: "sans-serif",
        }}
      >

        <Container
          style={{
            backgroundColor: "#111827",
            padding: "40px",
            borderRadius: "24px",
            color: "#ffffff",
          }}
        >

          <Heading
            style={{
              color: "#38bdf8",
            }}
          >

            📧 বুকিং কনফার্মেশন

          </Heading>

          <Text>

            প্রিয় {customerName},

          </Text>

          <Text>

            আপনার সার্ভিস বুকিং সফলভাবে গ্রহণ করা হয়েছে।

          </Text>

          <Section>

            <Text>

              🆔 Booking ID:
              {bookingId}

            </Text>

            <Text>

              👨‍🔧 Provider:
              {providerName}

            </Text>

            <Text>

              📞 Provider Contact:
              {providerPhone}

            </Text>

          </Section>

          <Text>

            ধন্যবাদ ❤️

          </Text>

          <Text>

            ShebaLagbe Team

          </Text>

        </Container>

      </Body>

    </Html>

  );

}