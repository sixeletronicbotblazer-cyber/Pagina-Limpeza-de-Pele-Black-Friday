/**
 * Conteúdo centralizado da página de vendas: Limpeza de Pele
 * com Natália Cavalcante. Fonte soberana: 02-headlines.md.
 * A headline aprovada não deve ser reescrita.
 */
export const content = {
  name: "Limpeza de Pele",
  brand: "Natália Cavalcante",
  badge: "Limpeza de Pele",
  hero: {
    eyebrow: "Curso introdutório · Black Friday antecipada",
    title:
      "Aprenda limpeza de pele do zero e dê o primeiro passo para ganhar dinheiro com seus próprios atendimentos.",
    sub: "Mesmo sem experiência em estética, comece pelas aulas introdutórias e siga a apostila ilustrada de 54 páginas para entender a pele, o procedimento e a organização do atendimento.",
    ctaPrimary: "Quero aprender limpeza de pele",
    ctaSecondary: "Ver prévias da apostila",
    bullets: [
      "Comece a estudar sem já ter equipamentos ou um espaço montado.",
      "Aprenda como planejar seus serviços, preços e relacionamento com as clientes.",
      "Receba a apostila, as aulas introdutórias e o certificado de conclusão por R$47, pagamento único.",
    ],
    stats: [
      { value: "54", label: "páginas ilustradas" },
      { value: "8", label: "tópicos do aprendizado" },
      { value: "R$47", label: "pagamento único" },
    ],
  },
  pains: [
    "Não sabe o que estudar primeiro",
    "Tem receio de não entender a técnica",
    "Ainda não tem um espaço montado",
    "Não conhece os materiais e produtos",
    "Tem dúvidas sobre preços e serviços",
    "Quer renda própria, mas falta um caminho",
  ],
  painsBridge:
    "Você pode começar pelo conhecimento. Depois, planejar a prática e a estrutura do seu atendimento.",
  previews: [
    ["11", "Conheça a pele", "Entenda a estrutura antes de estudar o procedimento."],
    ["17", "Reconheça os tipos de pele", "Veja características e necessidades de cada pele."],
    ["27", "Organize um atendimento seguro", "Estude higiene, materiais e biossegurança."],
    ["29", "Aprenda a avaliar a cliente", "Conheça o modelo de ficha de anamnese."],
    ["31", "Entenda o início do procedimento", "Da preparação à higienização, etapa por etapa."],
    ["35", "Finalize com orientação", "Conheça os cuidados que continuam em casa."],
    ["50", "Planeje seus serviços", "Explore exemplos de serviços, pacotes e preços."],
    ["52", "Consulte o checklist", "Retome os cuidados antes, durante e depois."],
  ] as [string, string, string][],
  steps: [
    ["Comece pelo básico", "Conheça a pele, suas características e o que observar na avaliação."],
    ["Entenda cada etapa", "Estude a sequência da limpeza de pele e a finalidade de cada cuidado."],
    ["Organize o atendimento", "Use as fichas e o checklist para aprender a preparar sua rotina."],
    ["Planeje os próximos passos", "Conheça serviços, preços e relacionamento para estruturar sua atuação."],
  ] as [string, string][],
  audience: [
    ["Quer buscar uma renda extra", "Conheça uma habilidade e estude como transformá-la em um serviço."],
    ["Está começando do zero", "Siga uma ordem de aprendizado, sem precisar adivinhar por onde começar."],
    ["Ainda não tem um espaço", "Comece pelo estudo e planeje a estrutura necessária para a prática."],
    ["Quer estudar no seu ritmo", "Consulte a apostila no celular, no tablet ou com o material impresso."],
    ["Já trabalha com beleza", "Conheça os fundamentos da limpeza de pele para ampliar seus estudos."],
    ["Quer organizar o atendimento", "Estude avaliação, cuidados, fichas e acompanhamento da cliente."],
  ] as [string, string][],
  benefits: [
    "Estrutura, funções e tipos de pele",
    "Avaliação, anamnese e biossegurança",
    "Limpeza de pele etapa por etapa",
    "Equipamentos e recursos complementares",
    "Cuidados antes e depois do procedimento",
    "Fichas e checklist para consulta",
    "Serviços, preços e relacionamento",
    "Planejamento do atendimento profissional",
  ],
  includes: [
    ["Apostila ilustrada de 54 páginas", "Do conhecimento da pele ao planejamento do atendimento."],
    ["Aulas introdutórias", "Boas-vindas e orientação para começar a usar o material."],
    ["Fichas e checklist na apostila", "Modelos para estudar avaliação, rotina e cuidados."],
    ["Certificado ao concluir", "Um registro da conclusão do curso com Natália Cavalcante."],
  ] as [string, string][],
  expert: {
    name: "Natália Cavalcante",
    quote:
      "Tudo começa com o primeiro passo: aprender, praticar e se especializar.",
    bio: "Quase cinco anos de prática na estética e experiência no atendimento a clientes.",
  },
  simulation: {
    title: "Uma nova habilidade. Uma possibilidade de renda.",
    text: "Simule valores para entender preço e quantidade de atendimentos. Faturamento bruto não é lucro — os resultados dependem de custos, demanda, prática e construção da clientela.",
    defaults: { price: 100, clients: 3, days: 22 },
    alt: { price: 120, clients: 4, days: 22 },
  },
  offer: {
    eyebrow: "Oferta · Black Friday antecipada",
    title: "Seu primeiro passo pode começar aqui.",
    desc: "Apostila ilustrada de 54 páginas, aulas introdutórias, modelos internos e certificado de conclusão.",
    price: "R$47",
    payment: "pagamento único · acesso vitalício",
    parcela: "ou 4x de R$11,75 sem juros",
    cta: "Quero começar agora",
    note: "Pagamento único. A disponibilidade e o valor final dependem da configuração do checkout.",
  },
  faq: [
    ["Preciso ter experiência em estética?", "Não precisa ter experiência para começar a estudar. O material parte dos fundamentos da pele e avança para avaliação, etapas e organização do atendimento."],
    ["É um curso em vídeo ou uma apostila?", "O conteúdo principal é a apostila ilustrada de 54 páginas. A oferta também inclui aulas introdutórias de boas-vindas e orientação de uso. O estudo técnico está concentrado na apostila."],
    ["Preciso comprar equipamentos antes de começar?", "Não para começar o estudo. O material apresenta produtos, materiais e equipamentos para você entender o que será necessário e planejar a prática."],
    ["Posso estudar pelo celular ou imprimir?", "Sim. A apostila é um PDF em A4 que pode ser consultado pelo celular, tablet ou computador e também impresso."],
    ["Vou receber certificado?", "Sim, a oferta inclui certificado ao concluir o curso. As orientações de conclusão e emissão serão apresentadas na área do curso."],
    ["Posso atender clientes assim que terminar?", "O curso apresenta fundamentos e organização do atendimento. A prática exige preparo, domínio das técnicas e atenção aos requisitos da atividade. O certificado registra a conclusão do curso; não substitui outros requisitos de formação ou atuação."],
    ["É possível organizar atendimentos em domicílio?", "É uma possibilidade a planejar conforme a estrutura, o transporte dos materiais, a higiene do ambiente e os requisitos do serviço. Não basta ter o PDF: a prática precisa de preparação adequada."],
    ["Os valores de faturamento são garantidos?", "Não. Os números apresentados são simulações para explicar preço e quantidade de atendimentos. Faturamento bruto não é lucro. Os resultados dependem de custos, demanda, prática e construção da clientela."],
    ["R$47 é uma mensalidade?", "Não. O valor informado para esta oferta é R$47, pagamento único, incluindo os materiais descritos nesta página."],
  ] as [string, string][],
  closing: {
    title:
      "Aprenda limpeza de pele do zero e dê o primeiro passo para ganhar dinheiro com seus próprios atendimentos.",
    text: "Estudar é o início. Praticar, planejar e construir sua clientela são os próximos passos.",
    cta: "Quero começar agora",
  },
  footer: {
    brand: "Natália Cavalcante · Limpeza de Pele",
    note: "Material educativo. Resultados financeiros variam conforme prática, demanda e custos. Imagens ilustrativas.",
  },
} as const;
