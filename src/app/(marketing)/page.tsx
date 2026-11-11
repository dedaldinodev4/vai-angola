import { Container } from "@/components/layout/container";

export default function HomePage() {
  return (
    <Container className="py-20 md:py-32">
      <h1 className="max-w-4xl">Descobre mais. Vive Angola.</h1>
      <p className="mt-6 max-w-xl text-lg text-ink/80">
        A página inicial editorial chega na próxima fase. Por agora, está pronta a estrutura: cores,
        tipografia, cabeçalho e rodapé.
      </p>
    </Container>
  );
}
