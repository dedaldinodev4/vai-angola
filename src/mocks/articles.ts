import type { Article } from "@/types";

const AUTHOR = "Redação Vai Angola (demonstração)";

/** Artigos de demonstração: títulos, resumos, datas e corpos são ilustrativos. */
export const articles: readonly Article[] = [
  {
    id: "art-001",
    slug: "fim-de-semana-lento-no-mussulo",
    title: "Um fim de semana lento no Mussulo",
    excerpt: "Do barco à mesa, um roteiro sem pressa para quem quer trocar o trânsito da cidade por maré e areia.",
    body: [
      "Imagina começar o dia cedo, com a baía calma e a cidade ainda a acordar. O ritmo deste fim de semana pede pouca pressa: uma travessia, uma sombra e uma mesa longa onde a conversa não olha para o relógio.",
      "A ideia é simples. Em vez de encher o dia de paragens, escolhes duas ou três coisas e fazes cada uma devagar. Um banho de mar, um almoço de peixe, uma caminhada pela areia ao fim da tarde.",
      "Levar pouco ajuda. Protetor solar, água, um chapéu e algum dinheiro trocado para o que aparecer. O resto resolve-se pelo caminho, perguntando a quem conhece o sítio.",
      "No regresso, vale a pena deixar a última hora livre. É nela que costumam surgir as melhores conversas e as fotografias de que mais se gosta.",
    ],
    publishedAt: "2026-10-02",
    author: AUTHOR,
    destinationSlug: "ilha-do-mussulo",
    art: { scene: "coast", tone: 0 },
    isDemo: true,
  },
  {
    id: "art-002",
    slug: "a-estrada-para-a-tundavala",
    title: "Ao encontro do planalto: a estrada para a Tundavala",
    excerpt: "Paragens, paisagens e o que esperar quando a serra se abre para a planície.",
    body: [
      "Há viagens em que a estrada já faz parte do destino. Esta começa a subir devagar, e a cada curva a paisagem muda de escala: primeiro campos, depois encostas, por fim um céu que parece mais perto.",
      "Convém sair cedo. A luz da manhã desenha melhor o relevo, e o ar do planalto costuma ser mais fresco do que se espera. Um agasalho leve não ocupa espaço e evita surpresas.",
      "No miradouro, o melhor conselho é não ter pressa em tirar fotografias. Olha primeiro. A planície lá em baixo muda com as nuvens, e esperar um pouco compensa.",
      "Ao descer, aproveita para parar nos pontos de vista que antes passaste a direito. A viagem de volta mostra sempre um país diferente.",
    ],
    publishedAt: "2026-09-18",
    author: AUTHOR,
    destinationSlug: "fenda-da-tundavala",
    art: { scene: "cliffs", tone: 1 },
    isDemo: true,
  },
  {
    id: "art-003",
    slug: "a-cidade-vista-da-baia",
    title: "A cidade vista da baía",
    excerpt: "Uma leitura da história de Luanda a partir das muralhas da fortaleza.",
    body: [
      "Subir às muralhas é uma boa maneira de perceber como uma cidade se organiza em torno da água. De cima, a baía ordena tudo: o porto, as avenidas, a linha dos prédios.",
      "Uma visita guiada ajuda a ligar cada espaço a uma época. Sem guia, vale a pena ler com calma os painéis e deixar que as perguntas fiquem para o fim.",
      "O melhor momento para fotografar costuma ser ao fim da tarde, quando a luz bate de lado nas pedras e o mar ganha cor.",
      "Depois, uma caminhada até à marginal fecha bem o passeio: a história que acabaste de ouvir continua à tua volta, agora com gente, música e trânsito.",
    ],
    publishedAt: "2026-08-27",
    author: AUTHOR,
    destinationSlug: "fortaleza-de-sao-miguel",
    art: { scene: "fort", tone: 2 },
    isDemo: true,
  },
];
