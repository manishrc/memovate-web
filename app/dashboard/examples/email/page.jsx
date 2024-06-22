import { Resend } from "resend";
import ExampleEmail from "@/emails/example";
const resend = new Resend(process.env.RESEND_API_KEY);

export default function EmailPage({ params, searchParams }) {
  async function sendEmail(formData) {
    "use server";

    const email = formData.get("email");
    const message = formData.get("message");

    const { data, error } = await resend.emails.send({
      from: "hello@resend.manishrc.com",
      to: "hi@manishrc.com",
      subject: "hello world",
      //   html: render(<ExampleEmail ctaLink="https://manishrc.com" />),
      react: <ExampleEmail ctaLink="https://manishrc.com" message={message} />,
    });
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Send React Email with Resend</h1>

      <form className="max-w-md" action={sendEmail}>
        <input
          className="block border border-gray-300 rounded px-4 py-2 mb-4"
          type="email"
          placeholder="Email"
          value="hi@manishrc.com"
          name="email"
        />
        <textarea
          name="message"
          className="block border border-gray-300 rounded px-4 py-2 mb-4"
          placeholder="Message"
        />
        <button className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Send
        </button>
      </form>
    </>
  );
}
