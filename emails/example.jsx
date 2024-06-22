import * as React from "react";
import { Tailwind, Button, Html, Text } from "@react-email/components";

export default function ExampleEmail(props) {
  return (
    <Html>
      <Tailwind>
        <Text className="text-red-600">{props.message}</Text>
        <Button
          href={props.ctaLink}
          style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
        >
          Click me
        </Button>
      </Tailwind>
    </Html>
  );
}

ExampleEmail.PreviewProps = {
  ctaLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  message: "Hello World",
};
