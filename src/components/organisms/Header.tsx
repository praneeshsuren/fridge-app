import Text from "../atoms/Text";

export default function Header() {
  return (
    <header className="text-center mt-12">
      <Text variant="h1" as="h1">
        Good Morning, Johny!
      </Text>
      <Text variant="body" className="mt-2">
        🌤 It's better to go shopping before this friday
      </Text>
    </header>
  );
}
