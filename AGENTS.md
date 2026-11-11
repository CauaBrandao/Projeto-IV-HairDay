# AGENTS.md — Diretrizes para Agentes de IA no HairDay

Este documento estabelece as diretrizes de desenvolvimento, regras arquiteturais e padrões de código para agentes de inteligência artificial (como OpenCode, Claude Code, Antigravity e outros) que atuarem na manutenção, evolução e testes do projeto **HairDay — Sistema de Agendamentos**.

---

## 1. Visão Geral do Projeto

O **HairDay** é uma Single Page Application (SPA) para gerenciamento de agendamentos em barbearias e salões de beleza, desenvolvida com base no protótipo oficial do Figma.

- **Stack Tecnológica Principal:**
  - React 18+ (Functional Components com Hooks e Context API)
  - TypeScript (Tipagem estrita, interfaces bem definidas e tipagem de DTOs)
  - Vite (Build tool e servidor de desenvolvimento ultra-rápido)
  - Tailwind CSS (Estilização utilitária fiel ao Dark Theme do Figma)
  - Lucide React (Ícones consistentes: tesoura, calendário, usuário, lixeira, sol, lua)
  - Playwright (Testes automatizados End-to-End e geração de evidências visuais)

---

## 2. Padrões de Arquitetura e Código

### 2.1 Componentização e Responsabilidades
- **Separação de Preocupações:**
  - `src/context/`: Estado global com `ScheduleContext.tsx` e `ScheduleProvider`.
  - `src/hooks/`: Hooks customizados para encapsular e fornecer dados (ex: `useSchedule`).
  - `src/types/`: Interfaces e types TypeScript puros (`Appointment`, `PeriodConfig`, `NewAppointmentDTO`).
  - `src/utils/`: Funções puras e utilitárias de manipulação de data (`dateUtils.ts`) e períodos (`periodUtils.ts`).
  - `src/components/Sidebar/`: Formulário de cadastro de agendamento e seletores.
  - `src/components/Schedule/`: Visualização da agenda por períodos com listagem e remoção.

### 2.2 Requisitos Obrigatórios de Lógica
- **Gerenciamento de Estado:** Utilizar `useState` e Context API para prover os agendamentos e a data ativa.
- **Funções de Alta Ordem (High-Order Array Methods):**
  - `filter()`: Para filtrar agendamentos por data, horários ocupados e exclusão de itens.
  - `map()`: Para renderizar listas de horários, períodos e cards de agendamento.
  - `reduce()`: Para agrupar agendamentos por período (`morning`, `afternoon`, `night`) e totalizar estatísticas.
- **Persistência:** Sincronização automática com `localStorage` sob a chave `@HairDay:appointments_v1`.
- **Validações:**
  - Nome do cliente obrigatório (não pode conter apenas espaços).
  - Data obrigatória.
  - Horário obrigatório.
  - Bloqueio imediato de horários já agendados para a mesma data (impede duplo agendamento).

---

## 3. Integração com MCPs (Model Context Protocol)

### 3.1 Context7 MCP
- **Finalidade:** Consulta em tempo real à documentação oficial atualizada das tecnologias do ecossistema:
  - React 18/19 (Hooks, Context API, Suspense)
  - TypeScript (tipagem de generics e DTOs)
  - Vite (configuração de build e preview)
  - Tailwind CSS (paleta de cores personalizadas e dark mode)
- **Instruções para o Agente:**
  - Sempre consulte o Context7 MCP caso haja dúvida sobre versões, parâmetros de APIs ou melhores práticas vigentes antes de sugerir soluções desatualizadas.

### 3.2 Playwright MCP
- **Finalidade:** Execução de testes de ponta a ponta (E2E), verificação funcional contínua e captura automática de telas em diferentes viewports (Desktop: 1280x800 e Mobile: 390x844).
- **Instruções para o Agente:**
  - Executar os testes automatizados com `npm run test:e2e` após cada alteração relevante na UI ou nas regras de negócio.
  - Manter os testes cobrindo os cenários:
    1. Renderização de layout e componentes fiéis ao Figma.
    2. Exibição dos agendamentos iniciais por períodos (Manhã, Tarde, Noite).
    3. Criação de novos agendamentos e atualização em tempo real.
    4. Exclusão de agendamentos pelo botão de lixeira.
    5. Mensagens para períodos sem agendamentos.
  - Salvar as capturas em `docs/screenshots/desktop.png` e `docs/screenshots/mobile.png`.

---

## 4. Regras do Design System (Figma)

1. **Cores:**
   - Fundo base: `#141416`
   - Cartões principais: `#1F1E22`
   - Inputs e botões secundários: `#2A292E`
   - Bordas sutis: `#38363E`
   - Cor Destaque / Dourado: `#B88E2F` (hover: `#C99D37`)
   - Textos: `#FFFFFF` (títulos), `#98959D` (subtítulos e labels), `#65636D` (placeholders)
2. **Períodos do Dia:**
   - **Manhã:** 09:00, 10:00, 11:00, 12:00
   - **Tarde:** 13:00, 14:00, 15:00, 16:00, 17:00, 18:00
   - **Noite:** 19:00, 20:00, 21:00

---

## 5. Instruções para Commits e Versionamento

- Seguir o padrão de commits convencionais:
  - `feat:` para novas funcionalidades.
  - `fix:` para correções de bugs.
  - `docs:` para documentação.
  - `test:` para acréscimo ou ajuste de testes Playwright.
- Certificar-se de rodar `npm run build` e `npm run test:e2e` antes de cada commit.

