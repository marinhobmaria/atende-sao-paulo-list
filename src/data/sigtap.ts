export interface SigtapProcedure {
  code: string;
  description: string;
  shortCode: string;
}

// Mock data do SIGTAP - em produção viria de uma API
export const sigtapProcedures: SigtapProcedure[] = [
  {
    code: "0301010010",
    shortCode: "AFVD",
    description: "Aferição de sinais vitais"
  },
  {
    code: "0301010028",
    shortCode: "CUBD",
    description: "Curativo especial"
  },
  {
    code: "0301010036",
    shortCode: "NEBU",
    description: "Nebulização/inalação"
  },
  {
    code: "0301010044",
    shortCode: "ADMM",
    description: "Administração de medicamentos"
  },
  {
    code: "0301010052",
    shortCode: "CURU",
    description: "Curativo"
  },
  {
    code: "0301010060",
    shortCode: "SUTR",
    description: "Sutura simples"
  },
  {
    code: "0301010079",
    shortCode: "REMO",
    description: "Remoção de pontos de sutura"
  },
  {
    code: "0301010087",
    shortCode: "VACI",
    description: "Vacinação"
  },
  {
    code: "0301010095",
    shortCode: "COLE",
    description: "Coleta de material para exame"
  },
  {
    code: "0301010109",
    shortCode: "INJE",
    description: "Aplicação de injeção"
  },
  {
    code: "0301010117",
    shortCode: "VERF",
    description: "Verificação de pressão arterial"
  },
  {
    code: "0301010125",
    shortCode: "GLIC",
    description: "Teste de glicemia capilar"
  },
  {
    code: "0301010133",
    shortCode: "PESO",
    description: "Aferição de peso e altura"
  },
  {
    code: "0301010141",
    shortCode: "TEMP",
    description: "Verificação de temperatura corporal"
  },
  {
    code: "0301010150",
    shortCode: "OXIM",
    description: "Oximetria de pulso"
  },
  {
    code: "0301020016",
    shortCode: "CONS",
    description: "Consulta médica"
  },
  {
    code: "0301020024",
    shortCode: "CONE",
    description: "Consulta de enfermagem"
  },
  {
    code: "0301020032",
    shortCode: "CONO",
    description: "Consulta odontológica"
  },
  {
    code: "0301020040",
    shortCode: "CONP",
    description: "Consulta/atendimento domiciliar"
  },
  {
    code: "0301020059",
    shortCode: "VISI",
    description: "Visita domiciliar por profissional de nível superior"
  },
  {
    code: "0301020067",
    shortCode: "VISD",
    description: "Visita domiciliar por profissional de nível médio"
  },
  {
    code: "0301020075",
    shortCode: "ATEN",
    description: "Atendimento individual por profissional de nível superior"
  },
  {
    code: "0301020083",
    shortCode: "ATEM",
    description: "Atendimento individual por profissional de nível médio"
  },
  {
    code: "0301020091",
    shortCode: "GRUP",
    description: "Atendimento em grupo por profissional de nível superior"
  },
  {
    code: "0301020105",
    shortCode: "GRUM",
    description: "Atendimento em grupo por profissional de nível médio"
  }
];