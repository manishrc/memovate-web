import { Container } from '@/app/(marketing)/components/Container';

const faqs = [
  [
    {
      question: 'How does it help with memory retention?',
      answer: `${process.env.NEXT_PUBLIC_APP_NAME} uses AI to generate and sequence flashcards and employs science-based techniques to enhance memory retention.`,
    },
    {
      question: 'How does the gamification work?',
      answer: `${process.env.NEXT_PUBLIC_APP_NAME} makes learning fun by incorporating interactive challenges and rewards, similar to popular apps, but focused on educational content.`,
    },
    {
      question: 'What are the 10-minute recall sessions?',
      answer: `${process.env.NEXT_PUBLIC_APP_NAME} encourages daily 10-minute recall sessions to build a consistent learning habit and improve memory retention.`,
    },
  ],
  [
    {
      question: 'Is this app suitable for all ages?',
      answer: `Yes, ${process.env.NEXT_PUBLIC_APP_NAME} is designed for learners of all ages, making it easy and enjoyable for anyone to improve their memory and learning speed.`,
    },
    {
      question: 'Can I track my progress?',
      answer: `Absolutely! ${process.env.NEXT_PUBLIC_APP_NAME} allows you to monitor your learning progress and see how much you’ve improved over time.`,
    },
    {
      question: 'Is there a community feature?',
      answer: `${process.env.NEXT_PUBLIC_APP_NAME} offers community features where you can share your progress, compete in challenges, and learn from others.`,
    },
  ],
  [
    {
      question: 'How does the AI generate flashcards?',
      answer: `The AI in ${process.env.NEXT_PUBLIC_APP_NAME} analyzes educational content to create personalized flashcards that adapt to your learning pace and needs.`,
    },
    {
      question: 'Is the app based on research?',
      answer: `Yes, ${process.env.NEXT_PUBLIC_APP_NAME} uses techniques backed by scientific research to enhance learning efficacy and habit formation.`,
    },
    {
      question: 'What makes this app different from other learning apps?',
      answer: `${process.env.NEXT_PUBLIC_APP_NAME} combines AI technology, gamification, and science-based techniques to create a unique and effective learning experience.`,
    },
  ],
];

export function Faqs() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="border-t border-gray-200 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            Frequently asked questions
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            If you have anything else you want to ask,{' '}
            <a
              href="mailto:hello@memovate.com"
              className="text-gray-900 underline"
            >
              reach out to us
            </a>
            .
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-gray-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
