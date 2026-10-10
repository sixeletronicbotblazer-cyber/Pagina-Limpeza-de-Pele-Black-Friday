/**
 * Base de dados para notificações de compra.
 *
 * Regras do produtor:
 *  - Sempre capitais e cidades médias próximas às capitais.
 *  - Foco em São Paulo, Minas Gerais e Nordeste.
 *  - Nunca repetir a mesma pessoa (nome + cidade) numa mesma sessão.
 *
 * As notificações são ilustrativas — não são depoimentos nem resultados.
 */

export const BUYER_NAMES: string[] = [
  "Ana", "Julia", "Camila", "Marina", "Beatriz", "Letícia", "Amanda",
  "Fernanda", "Patrícia", "Juliana", "Larissa", "Vanessa", "Carolina",
  "Gabriela", "Aline", "Tatiane", "Bruna", "Renata", "Cleide", "Márcia",
  "Sandra", "Roberta", "Priscila", "Bianca", "Mirela", "Karen", "Nathália",
  "Rafaela", "Daniela", "Érica", "Fabiana", "Lisandra", "Sheila", "Vivian",
  "Yara", "Iara", "Dandara", "Célia", "Solange", "Rosângela", "Cláudia",
  "Sueli", "Tereza", "Lúcia", "Marisa", "Débora", "Tatiana", "Evelin",
  "Sabrina", "Jéssica", "Luciana", "Cíntia", "Vânia", "Michele", "Karla",
  "Adriana", "Raquel", "Brenda", "Eduarda", "Helena", "Luiza", "Manoela",
  "Sophia", "Valentina", "Heloísa", "Laura", "Maria", "Alice", "Yasmin",
  "Isabela", "Aparecida", "Rosana", "Cristiane", "Simone", "Gisele",
  "Roseli", "Márcia Regina", "Carla", "Daniela", "Vera", "Iolanda",
  "Mônica", "Tânia", "Selma", "Iris", "Jaqueline", "Lidiane", "Marlene",
  "Nair", "Otília", "Pâmela", "Quésia", "Rita", "Sara", "Talita",
  "Ulisses", "Wanessa", "Xuxa", "Zélia", "Aurora", "Bárbara", "Cássia",
];

export const BUYER_CITIES: string[] = [
  // São Paulo (capital + cidades médias próximas)
  "São Paulo - SP", "Guarulhos - SP", "Campinas - SP", "São Bernardo do Campo - SP",
  "Santo André - SP", "Osasco - SP", "Sorocaba - SP", "Ribeirão Preto - SP",
  "Santos - SP", "São José dos Campos - SP", "Mauá - SP", "Diadema - SP",
  "Carapicuíba - SP", "Mogi das Cruzes - SP", "Piracicaba - SP", "Bauru - SP",
  "Jundiaí - SP", "São José do Rio Preto - SP", "Franca - SP", "Taubaté - SP",
  "Itaquaquecetuba - SP", "Presidente Prudente - SP", "Marília - SP",
  // Rio de Janeiro (vizinho de SP)
  "Rio de Janeiro - RJ", "Niterói - RJ", "São Gonçalo - RJ", "Duque de Caxias - RJ",
  "Nova Iguaçu - RJ", "Petrópolis - RJ", "Volta Redonda - RJ", "Teresópolis - RJ",
  "Macaé - RJ", "Campos dos Goytacazes - RJ",
  // Minas Gerais (capital + cidades médias)
  "Belo Horizonte - MG", "Contagem - MG", "Betim - MG", "Ribeirão das Neves - MG",
  "Uberlândia - MG", "Montes Claros - MG", "Juiz de Fora - MG", "Divinópolis - MG",
  "Sete Lagoas - MG", "Ipatinga - MG", "Santa Luzia - MG", "Poços de Caldas - MG",
  "Pouso Alegre - MG", "Patos de Minas - MG", "Varginha - MG", "São João del-Rei - MG",
  "Ubá - MG", "Passos - MG", "Araxá - MG", "Lavras - MG", "Governador Valadares - MG",
  "Teófilo Otoni - MG", "Ponte Nova - MG", "Formiga - MG",
  // Nordeste — Bahia
  "Salvador - BA", "Lauro de Freitas - BA", "Camaçari - BA", "Feira de Santana - BA",
  "Vitória da Conquista - BA", "Ilhéus - BA", "Itabuna - BA", "Barreiras - BA",
  // Pernambuco
  "Recife - PE", "Olinda - PE", "Jaboatão dos Guararapes - PE", "Caruaru - PE",
  "Petrolina - PE", "Garanhuns - PE", "Cabo de Santo Agostinho - PE",
  // Ceará
  "Fortaleza - CE", "Caucaia - CE", "Maracanaú - CE", "Juazeiro do Norte - CE",
  "Sobral - CE", "Crato - CE", "Itapipoca - CE",
  // Maranhão
  "São Luís - MA", "Imperatriz - MA", "Caxias - MA", "Timon - MA",
  // Rio Grande do Norte
  "Natal - RN", "Mossoró - RN", "Parnamirim - RN", "Caicó - RN",
  // Paraíba
  "João Pessoa - PB", "Campina Grande - PB", "Santa Rita - PB", "Patos - PB",
  // Alagoas
  "Maceió - AL", "Arapiraca - AL", "Palmeira dos Índios - AL", "Rio Largo - AL",
  // Sergipe
  "Aracaju - SE", "Nossa Senhora do Socorro - SE", "Lagarto - SE", "Itabaiana - SE",
  // Piauí
  "Teresina - PI", "Parnaíba - PI", "Picos - PI", "Floriano - PI",
];

export const OFFER_VARIANTS: string[] = [
  "Apostila de Limpeza de Pele + Aulas + Certificado",
  "Curso de Limpeza de Pele — Apostila + Certificado",
  "Apostila de 54 Páginas + Aulas Introdutórias",
  "Limpeza de Pele do Zero — Pacote Completo",
  "Apostila + Aulas + Certificado (R$47)",
];

/** Tempo relativo exibido na notificação. */
export const BUYER_TIME_LABEL = "comprou agora";

/** Avatar = inicial do primeiro nome. */
export function getInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase();
}

/** Cor de fundo do avatar — paleta creme/rosé/bordô. */
const AVATAR_COLORS = [
  "bg-[#e8c9ca] text-[#650d25]",
  "bg-[#f3ead8] text-[#650d25]",
  "bg-[#d9b48a] text-[#322a2c]",
  "bg-[#e8d4c0] text-[#650d25]",
  "bg-[#f0dcc4] text-[#650d25]",
];

export function getAvatarColor(name: string): string {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

export interface BuyerNotification {
  id: number;
  name: string;
  offer: string;
  city: string;
  at: number; // timestamp de "compra"
}

/**
 * Sorteia um par (nome, cidade) que ainda não apareceu na sessão.
 * Retorna null quando a base se esgota (raríssimo) para evitar repetição.
 */
export function pickUniqueBuyer(
  used: Set<string>,
): { name: string; city: string; offer: string } | null {
  const free: { name: string; city: string }[] = [];
  for (const name of BUYER_NAMES) {
    for (const city of BUYER_CITIES) {
      const key = `${name}|${city}`;
      if (!used.has(key)) free.push({ name, city });
    }
  }
  if (free.length === 0) return null;
  const pick = free[Math.floor(Math.random() * free.length)];
  const offer =
    OFFER_VARIANTS[Math.floor(Math.random() * OFFER_VARIANTS.length)];
  return { name: pick.name, city: pick.city, offer };
}
