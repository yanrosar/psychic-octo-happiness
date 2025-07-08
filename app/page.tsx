"use client"

import React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Share2,
  Calendar,
  MapPin,
  Heart,
  MessageCircle,
  Copy,
  Check,
  Facebook,
  Twitter,
  MessageSquare,
} from "lucide-react"

// Mover SignatureForm para fora do componente principal e usar React.memo
const SignatureForm = React.memo(
  ({
    signatures,
    signed,
    firstName,
    lastName,
    email,
    onFirstNameChange,
    onLastNameChange,
    onEmailChange,
    onSubmit,
    onShareClick,
    isLoading,
  }: {
    signatures: number
    signed: boolean
    firstName: string
    lastName: string
    email: string
    onFirstNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onLastNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: (e: React.FormEvent) => void
    onShareClick: (platform: string) => void
    isLoading: boolean
  }) => (
    <Card className="w-full">
      <CardContent className="pt-6">
        {!signed ? (
          <div className="space-y-6">
            {/* Signature Counter */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-4xl font-bold text-gray-900">{signatures.toLocaleString()}</span>
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                <span>Assinaturas verificadas</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Form Title */}
            <h3 className="text-xl font-semibold text-gray-900">Assine este abaixo-assinado</h3>

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  Nome
                </Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={onFirstNameChange}
                  className="mt-1 h-10 rounded-lg border-gray-300 focus:bg-white focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Digite seu nome"
                  style={{ fontSize: "16px" }}
                  required
                />
              </div>

              <div>
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  Sobrenome
                </Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={onLastNameChange}
                  className="mt-1 h-10 rounded-lg border-gray-300 focus:bg-white focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Digite seu sobrenome"
                  style={{ fontSize: "16px" }}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={onEmailChange}
                  className="mt-1 h-10 rounded-lg border-gray-300 focus:bg-white focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Digite seu email"
                  style={{ fontSize: "16px" }}
                  required
                />
              </div>

              {/* Radio Options */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    id="follow-yes"
                    name="follow"
                    className="mt-1 w-4 h-4 text-blue-600"
                    defaultChecked
                  />
                  <label htmlFor="follow-yes" className="text-sm text-gray-700 leading-relaxed">
                    Sim! Me conte se esta petição se tornar uma vitória e como posso ajudar outras petições relevantes.
                  </label>
                </div>
                <div className="flex items-start gap-3">
                  <input type="radio" id="follow-no" name="follow" className="mt-1 w-4 h-4 text-blue-600" />
                  <label htmlFor="follow-no" className="text-sm text-gray-700 leading-relaxed">
                    Não, prefiro não acompanhar as novidades desta petição ou de outras petições relevantes.
                  </label>
                </div>
              </div>

              {/* Sign Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full h-12 sm:h-11 font-semibold rounded-lg text-sm sm:text-base transition-all duration-300 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 hover:scale-[1.02] active:scale-[0.98]"
                } text-white`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processando...</span>
                  </div>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                    Assinar abaixo-assinado
                  </>
                )}
              </Button>

              {/* Privacy Checkbox */}
              <div className="flex items-start gap-3">
                <input type="checkbox" id="hide-signature" className="mt-1 w-4 h-4 text-blue-600" />
                <label htmlFor="hide-signature" className="text-sm text-gray-700">
                  Não exibir minha assinatura e meu comentário neste abaixo-assinado
                </label>
              </div>

              {/* Privacy Text */}
              <p className="text-xs text-gray-500 leading-relaxed">
                Processamos seus dados pessoais de acordo com nossa{" "}
                <a href="#" className="text-blue-600 underline">
                  Política de privacidade
                </a>{" "}
                e nossos{" "}
                <a href="#" className="text-blue-600 underline">
                  Termos de uso
                </a>
                .
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-green-600 fill-current" />
            </div>
            <h3 className="text-lg font-semibold text-green-600 mb-2">Obrigado por assinar!</h3>
            <p className="text-sm text-gray-600 mb-4">Sua assinatura foi registrada com sucesso.</p>
            <Button variant="outline" className="w-full bg-transparent" onClick={() => onShareClick("default")}>
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar com amigos
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  ),
)

export default function PetitionPage() {
  const [signatures, setSignatures] = useState(903123)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [signed, setSigned] = useState(false)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [notifications, setNotifications] = useState<Array<{ id: number; name: string; location: string }>>([])
  const [usedNames, setUsedNames] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const [copiedFacebook, setCopiedFacebook] = useState(false)
  const [copiedTwitter, setCopiedTwitter] = useState(false)
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false)
  const [copiedCopy, setCopiedCopy] = useState(false)

  const goal = 1000000
  const progress = (signatures / goal) * 100
  const shareLink = "https://abaixo-assinado.com.br/impeachment-lula-2024"

  const randomNames = [
    "Carlos Silva",
    "Ana Oliveira",
    "João Santos",
    "Maria Costa",
    "Pedro Ferreira",
    "Lucia Mendes",
    "Roberto Lima",
    "Sandra Rocha",
    "Antonio Souza",
    "Carmen Dias",
    "Fernando Alves",
    "Patricia Gomes",
    "Ricardo Moreira",
    "Juliana Barbosa",
    "Marcos Pereira",
    "Camila Rodrigues",
    "Diego Martins",
    "Beatriz Carvalho",
    "Rafael Nascimento",
    "Larissa Freitas",
    "Gustavo Ribeiro",
    "Vanessa Cardoso",
    "Bruno Teixeira",
    "Gabriela Monteiro",
    "Thiago Correia",
    "Amanda Vieira",
    "Leonardo Araújo",
    "Priscila Ramos",
    "Rodrigo Fernandes",
    "Natália Castro",
    "Felipe Machado",
    "Renata Pinto",
    "André Cavalcanti",
    "Cristina Lopes",
    "Marcelo Duarte",
    "Tatiana Nunes",
    "Vinicius Campos",
    "Daniela Soares",
    "Fabio Melo",
    "Adriana Torres",
    "Leandro Cunha",
    "Simone Batista",
    "Claudio Rezende",
    "Monica Santana",
    "Eduardo Farias",
    "Carla Mendonça",
    "Sergio Azevedo",
    "Eliane Moura",
    "Henrique Borges",
    "Luciana Dias",
    "Alexandre Coelho",
    "Rosana Guimarães",
    "Mauricio Silveira",
    "Fernanda Nogueira",
    "Otavio Barros",
    "Silvia Paiva",
    "Cesar Andrade",
    "Mariana Vasconcelos",
    "Ronaldo Tavares",
    "Claudia Siqueira",
    "Flavio Medeiros",
    "Denise Amaral",
    "Wagner Brito",
    "Sabrina Leite",
    "Edson Magalhães",
    "Viviane Caldeira",
    "Nelson Fonseca",
    "Ingrid Bastos",
    "Rubens Peixoto",
    "Karina Evangelista",
    "Gilberto Rocha",
    "Solange Miranda",
    "Everton Macedo",
    "Bianca Godoy",
    "Valter Esteves",
    "Cintia Brandão",
    "Davi Portela",
    "Elisa Figueiredo",
    "Geraldo Pacheco",
    "Jaqueline Morais",
    "Hugo Veloso",
    "Raquel Sampaio",
    "Ismael Cardoso",
    "Leticia Aguiar",
    "Nilton Ribas",
    "Sheila Vargas",
    "Caio Leal",
    "Milena Coutinho",
    "Edimar Galvão",
    "Tania Senna",
    "Renan Quintana",
    "Vera Lúcia",
    "Ailton Pedrosa",
    "Joana Ferraz",
    "Wanderson Lira",
    "Cristiane Matos",
    "Emerson Viana",
    "Luciene Bispo",
    "Valdir Muniz",
    "Elza Prado",
  ]

  const recentSigners = [
    {
      name: "Maria Silva",
      location: "São Paulo, SP",
      time: "2 min atrás",
      comment: "Apoio o impeachment! Brasil merece melhor!",
    },
    {
      name: "João Santos",
      location: "Rio de Janeiro, RJ",
      time: "5 min atrás",
      comment: "Pela democracia e pela Constituição!",
    },
    {
      name: "Ana Costa",
      location: "Belo Horizonte, MG",
      time: "8 min atrás",
      comment: "Chega de desrespeito às instituições!",
    },
    {
      name: "Pedro Oliveira",
      location: "Brasília, DF",
      time: "12 min atrás",
      comment: "Lula persona non grata! Fora!",
    },
    {
      name: "Carla Ferreira",
      location: "Salvador, BA",
      time: "15 min atrás",
      comment: "Impeachment já! O Brasil não pode esperar!",
    },
  ]

  // Random notifications system
  useEffect(() => {
    const interval = setInterval(
      () => {
        // Filtrar nomes não utilizados
        const availableNames = randomNames.filter((name) => !usedNames.includes(name))

        // Se todos os nomes foram usados, resetar a lista
        if (availableNames.length === 0) {
          setUsedNames([])
          return
        }

        const randomName = availableNames[Math.floor(Math.random() * availableNames.length)]
        const notificationId = Date.now()

        setNotifications((prev) => [
          ...prev,
          {
            id: notificationId,
            name: randomName,
            location: "", // Remover localização
          },
        ])

        // Adicionar nome à lista de usados
        setUsedNames((prev) => [...prev, randomName])

        setSignatures((prev) => prev + 1)

        // Remove notification after 5 seconds
        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
        }, 5000)
      },
      Math.random() * 10000 + 5000,
    )

    return () => clearInterval(interval)
  }, [usedNames])

  // Substituir as funções handleSign e outras por versões otimizadas
  const handleFirstNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value)
  }, [])

  const handleLastNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value)
  }, [])

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }, [])

  const handleSign = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (firstName && lastName && email && !isLoading) {
        setIsLoading(true)

        // Salvar dados da assinatura no localStorage
        const signatureData = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          fullName: `${firstName} ${lastName}`, // Nome completo
          timestamp: new Date().toISOString(),
        }

        // Salvar em múltiplas chaves para garantir compatibilidade
        localStorage.setItem("lastSignature", JSON.stringify(signatureData))
        localStorage.setItem("firstName", firstName)
        localStorage.setItem("lastName", lastName)
        localStorage.setItem("email", email)
        localStorage.setItem("fullName", `${firstName} ${lastName}`)
        localStorage.setItem("signatureFirstName", firstName)
        localStorage.setItem("signatureLastName", lastName)
        localStorage.setItem("signatureEmail", email)
        localStorage.setItem("signatureFullName", `${firstName} ${lastName}`)

        // Enviar evento Lead para Facebook Pixel
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Lead", {
            content_name: "Abaixo-Assinado Impeachment Lula",
            content_category: "Political Petition",
            value: 0,
            currency: "BRL",
          })
        }

        // Simular processamento
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setSignatures((prev) => prev + 1)
        setFirstName("")
        setLastName("")
        setEmail("")
        setIsLoading(false)

        // Redirecionar para página de contribuição com o nome
        window.location.href = `/contribuir?firstName=${encodeURIComponent(firstName)}`
      }
    },
    [firstName, lastName, email, isLoading],
  )

  const handleShareClick = async (platform: string) => {
    const text = "Apoie o Impeachment de Lula - Pelo Futuro da Democracia"
    const url = shareLink

    // Sempre copiar o link primeiro
    try {
      await navigator.clipboard.writeText(url)

      // Definir feedback específico para cada plataforma
      switch (platform) {
        case "facebook":
          setCopiedFacebook(true)
          setTimeout(() => setCopiedFacebook(false), 3000)
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
          break
        case "twitter":
          setCopiedTwitter(true)
          setTimeout(() => setCopiedTwitter(false), 3000)
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            "_blank",
          )
          break
        case "whatsapp":
          setCopiedWhatsApp(true)
          setTimeout(() => setCopiedWhatsApp(false), 3000)
          window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, "_blank")
          break
        case "copy":
          setCopiedCopy(true)
          setTimeout(() => setCopiedCopy(false), 3000)
          break
        case "header-copy":
          setCopiedLink(true)
          setTimeout(() => setCopiedLink(false), 3000)
          break
        default:
          setShareDialogOpen(true)
      }
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  const handleCopyLink = async () => {
    const url = shareLink
    try {
      await navigator.clipboard.writeText(url)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 3000)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Link Copied Notification */}
      {copiedLink && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-top duration-300">
          <Check className="w-5 h-5" />
          <span className="font-medium">Link copiado!</span>
        </div>
      )}

      {/* Notifications */}
      <div className="fixed top-20 right-2 sm:right-4 z-40 space-y-2 max-w-[280px] sm:max-w-xs">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-right duration-500 max-w-xs"
          >
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="text-sm">
              <span className="font-medium">{notification.name}</span>
              <div className="text-xs text-green-100">acabou de assinar!</div>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-green-600">Abaixo-Assinado</span>
              <span className="text-xl sm:text-2xl">🇧🇷</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className={`text-xs sm:text-sm transition-colors duration-200 ${
                copiedLink ? "bg-green-50 border-green-200 text-green-700" : "bg-transparent"
              }`}
              onClick={async () => {
                const url = shareLink
                try {
                  await navigator.clipboard.writeText(url)
                  setCopiedLink(true)
                  setTimeout(() => setCopiedLink(false), 3000)
                } catch (err) {
                  console.error("Failed to copy link:", err)
                }
              }}
            >
              {copiedLink ? (
                <Check className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              ) : (
                <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              )}
              <span className="hidden sm:inline">{copiedLink ? "Copiado!" : "Compartilhar"}</span>
              <span className="sm:hidden">{copiedLink ? "OK!" : "Share"}</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Petition Header */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>Brasil</span>
                  <Calendar className="w-4 h-4 ml-4" />
                  <span>Iniciada em 22 de junho de 2025</span>
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-bold leading-tight">
                  Abaixo-Assinado para o Impeachment de Lula
                </CardTitle>
              </CardHeader>
            </Card>

            {/* Petition Video - YouTube Embed */}
            <div className="relative rounded-lg overflow-hidden">
              <div className="relative w-full h-64 md:h-96">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/eOxAAdB-GpI"
                  title="A Crise do Governo Lula, Explicada"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Mobile Signature Form - Aparece após a imagem no mobile */}
            <div className="lg:hidden">
              <SignatureForm
                signatures={signatures}
                signed={signed}
                firstName={firstName}
                lastName={lastName}
                email={email}
                onFirstNameChange={handleFirstNameChange}
                onLastNameChange={handleLastNameChange}
                onEmailChange={handleEmailChange}
                onSubmit={handleSign}
                onShareClick={handleShareClick}
                isLoading={isLoading}
              />
            </div>

            {/* Petition Content */}
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-4">MANIFESTO PELO IMPEACHMENT DO PRESIDENTE LULA</h3>

                  <h4 className="text-lg font-semibold mb-3">
                    O estopim da indignação: a hostilidade contra uma nação amiga e a banalização do Holocausto
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Em um ato de profunda irresponsabilidade e desprezo pela história e pelos laços diplomáticos do
                    Brasil, o presidente Lula, em 18 de fevereiro de 2024, proferiu uma declaração que chocou o mundo e
                    envergonhou nossa nação. Ao comparar as ações de defesa do Estado de Israel a uma das maiores
                    atrocidades da humanidade, o Holocausto perpetrado pelo regime nazista de Adolf Hitler, o presidente
                    não apenas demonstrou um alarmante desconhecimento histórico, mas também cometeu um ato de
                    hostilidade flagrante contra uma nação amiga.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Essa declaração não foi uma mera gafe. Foi uma escolha deliberada de palavras que, além de banalizar
                    o sofrimento de milhões de vítimas do nazismo, configurou um grave crime de responsabilidade,
                    conforme tipificado no Artigo 5º, item 3, da Lei 1.079/50. Este dispositivo legal é claro ao definir
                    como crime "cometer ato de hostilidade contra nação estrangeira, expondo a República ao perigo da
                    guerra, ou comprometendo-lhe a neutralidade". A fala do presidente gerou uma crise diplomática sem
                    precedentes, culminando na declaração de que ele é persona non grata em Israel e colocando o Brasil
                    em uma posição de isolamento e descrédito no cenário internacional.
                  </p>

                  <h4 className="text-lg font-semibold mb-3">
                    Um governo que flerta com o autoritarismo e desrespeita a Constituição
                  </h4>
                  <p className="text-gray-700 mb-4">
                    A fala sobre Israel e o Holocausto não é um fato isolado, mas sim o ápice de uma série de ações e
                    declarações que demonstram o desapreço do atual governo pelos valores democráticos, pela nossa
                    Constituição Federal, pelos Direitos Humanos e pelos tratados internacionais dos quais o Brasil é
                    signatário. Testemunhamos um governo que relativiza a tirania, que apoia regimes autoritários e que,
                    internamente, busca minar as instituições que garantem a nossa liberdade.
                  </p>

                  <h4 className="text-lg font-semibold mb-3">O Congresso Nacional tem o dever de agir</h4>
                  <p className="text-gray-700 mb-4">
                    O pedido de impeachment, protocolado em 22 de fevereiro de 2024, é um instrumento legítimo e
                    necessário para a defesa do Estado Democrático de Direito. Apoiado por um número expressivo de
                    deputados de diferentes partidos, ele representa a voz de milhões de brasileiros que não se calam
                    diante do arbítrio e da irresponsabilidade.
                  </p>

                  <h4 className="text-lg font-semibold mb-3">Nossa voz, nossa pressão</h4>
                  <p className="text-gray-700 mb-4">
                    Este abaixo-assinado é a nossa ferramenta de pressão popular. É a demonstração inequívoca de que a
                    sociedade civil está atenta, vigilante e não irá tolerar que o mais alto mandatário da nação coloque
                    em risco a segurança e a reputação do Brasil por suas convicções ideológicas e declarações
                    ofensivas.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Convocamos o Presidente da Câmara dos Deputados, Arthur Lira (PP), a cumprir seu papel
                    constitucional e pautar o pedido de impeachment. A "Casa do Povo" não pode se omitir diante de um
                    crime de responsabilidade tão evidente.
                  </p>

                  <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
                    <h4 className="text-lg font-bold text-red-800 mb-2">
                      ASSINE ESTE ABAIXO-ASSINADO E JUNTE-SE A MILHÕES DE BRASILEIROS QUE EXIGEM O IMPEACHMENT DE LULA!
                    </h4>
                    <p className="text-red-700">
                      Pelo respeito à nossa Constituição, pela manutenção da paz e da neutralidade de nossa política
                      externa, e pelo futuro da democracia em nosso país, a hora é agora. A sua assinatura tem o poder
                      de mudar o rumo da nossa história.
                    </p>
                  </div>

                  <div className="text-center mt-6">
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      #ImpeachmentLulaJá
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Signatures */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Assinaturas Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSigners.map((signer, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>
                          {signer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{signer.name}</span>
                          <span className="text-sm text-gray-500">{signer.location}</span>
                          <span className="text-sm text-gray-400">{signer.time}</span>
                        </div>
                        <p className="text-sm text-gray-700">{signer.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block space-y-6">
            {/* Sign Petition Card - Fixed para desktop */}
            <div className="sticky top-20 z-20">
              <SignatureForm
                signatures={signatures}
                signed={signed}
                firstName={firstName}
                lastName={lastName}
                email={email}
                onFirstNameChange={handleFirstNameChange}
                onLastNameChange={handleLastNameChange}
                onEmailChange={handleEmailChange}
                onSubmit={handleSign}
                onShareClick={handleShareClick}
                isLoading={isLoading}
              />

              {/* Share Card - Also sticky */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Compartilhe esta petição</CardTitle>
                  <CardDescription>Ajude a espalhar a palavra e conseguir mais assinaturas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className={`justify-start transition-colors duration-200 h-11 px-4 ${
                      copiedFacebook ? "bg-green-50 border-green-200 text-green-700" : "bg-transparent"
                    }`}
                    onClick={() => handleShareClick("facebook")}
                  >
                    <Facebook className="w-5 h-5 mr-2 text-blue-600" />
                    {copiedFacebook ? "Link copiado!" : "Compartilhar no Facebook"}
                  </Button>
                  <Button
                    variant="outline"
                    className={`justify-start transition-colors duration-200 h-11 px-4 ${
                      copiedTwitter ? "bg-green-50 border-green-200 text-green-700" : "bg-transparent"
                    }`}
                    onClick={() => handleShareClick("twitter")}
                  >
                    <Twitter className="w-5 h-5 mr-2 text-blue-400" />
                    {copiedTwitter ? "Link copiado!" : "Compartilhar no Twitter"}
                  </Button>
                  <Button
                    variant="outline"
                    className={`justify-start transition-colors duration-200 h-11 px-4 ${
                      copiedWhatsApp ? "bg-green-50 border-green-200 text-green-700" : "bg-transparent"
                    }`}
                    onClick={() => handleShareClick("whatsapp")}
                  >
                    <MessageSquare className="w-5 h-5 mr-2 text-green-600" />
                    {copiedWhatsApp ? "Link copiado!" : "Compartilhar no WhatsApp"}
                  </Button>
                  <Button
                    variant="outline"
                    className={`justify-start transition-colors duration-200 h-11 px-4 ${
                      copiedCopy ? "bg-green-50 border-green-200 text-green-700" : "bg-transparent"
                    }`}
                    onClick={() => handleShareClick("copy")}
                  >
                    {copiedCopy ? (
                      <Check className="w-4 h-4 mr-2 text-green-600" />
                    ) : (
                      <Share2 className="w-4 h-4 mr-2" />
                    )}
                    {copiedCopy ? "Link copiado!" : "Copiar link"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Compartilhar Petição</DialogTitle>
            <DialogDescription>Copie o link abaixo e compartilhe com seus amigos e familiares</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input id="link" defaultValue={shareLink} readOnly className="h-10" />
            </div>
            <Button type="submit" size="sm" className="px-3" onClick={handleCopyLink}>
              <span className="sr-only">Copy</span>
              {copiedLink ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          {copiedLink && <p className="text-sm text-green-600 text-center">Link copiado!</p>}
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 PetiçãoBR. Todos os direitos reservados.</p>
            <p className="mt-2 text-sm">Plataforma para petições online e mobilização social no Brasil.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
