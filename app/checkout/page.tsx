"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Check, Star, AlertCircle, Copy, Clock, CreditCard, ArrowLeft } from "lucide-react"
import { ActionButton } from "@/components/ui/action-button"

interface PixData {
  pixCode: string
  paymentId: string
  value: number
}

export default function CheckoutPage() {
  const [firstName, setFirstName] = useState<string>("Yan")
  const [selectedAmount, setSelectedAmount] = useState<number>(30) // Pré-selecionado R$ 30
  const [customAmount, setCustomAmount] = useState<string>("")
  const [fullName, setFullName] = useState<string>("")
  const [cpf, setCpf] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [pixData, setPixData] = useState<PixData | null>(null)
  const [showPixCode, setShowPixCode] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60) // 15 minutos
  const [isCheckingPayment, setIsCheckingPayment] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Buscar dados da assinatura
      const signatureData = localStorage.getItem("lastSignature")

      if (signatureData) {
        try {
          const data = JSON.parse(signatureData)
          console.log("Dados da assinatura encontrados:", data)

          // Preencher campos automaticamente
          if (data.firstName) {
            setFirstName(data.firstName)
          }
          if (data.fullName) {
            setFullName(data.fullName)
          } else if (data.firstName && data.lastName) {
            setFullName(`${data.firstName} ${data.lastName}`)
          }
          if (data.email) {
            setEmail(data.email)
          }
        } catch (e) {
          console.error("Erro ao parsear dados da assinatura:", e)
        }
      }

      // Fallback para outras fontes de dados
      if (!fullName) {
        const storedFullName = localStorage.getItem("fullName") || localStorage.getItem("signatureFullName")
        if (storedFullName) {
          setFullName(storedFullName)
        } else {
          // Construir nome completo a partir de firstName e lastName
          const storedFirstName = localStorage.getItem("firstName") || localStorage.getItem("signatureFirstName")
          const storedLastName = localStorage.getItem("lastName") || localStorage.getItem("signatureLastName")

          if (storedFirstName && storedLastName) {
            setFullName(`${storedFirstName} ${storedLastName}`)
          } else if (storedFirstName) {
            setFullName(storedFirstName)
          }
        }
      }

      if (!email) {
        const storedEmail = localStorage.getItem("email") || localStorage.getItem("signatureEmail")
        if (storedEmail) {
          setEmail(storedEmail)
        }
      }

      if (!firstName) {
        const contributorName =
          localStorage.getItem("contributorName") ||
          localStorage.getItem("firstName") ||
          localStorage.getItem("signatureFirstName")

        if (contributorName && contributorName.trim() !== "") {
          setFirstName(contributorName.trim())
        }
      }

      console.log("Dados preenchidos automaticamente:", {
        firstName,
        fullName,
        email,
      })
    }
  }, [])

  // Countdown timer para PIX
  useEffect(() => {
    if (showPixCode && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [showPixCode, timeLeft])

  // Verificação automática de pagamento
  useEffect(() => {
    if (showPixCode && pixData) {
      const checkPayment = async () => {
        try {
          // Remover setIsCheckingPayment(true) da verificação automática
          console.log(`[Verificação] Checando pagamento ID: ${pixData.paymentId}`)

          const response = await fetch(
            `https://hook.us2.make.com/eggh27mpawl97q2tmewhq3dr4ke2d474?id=${pixData.paymentId}`,
          )

          if (!response.ok) {
            console.error(`[Verificação] Erro HTTP: ${response.status}`)
            return
          }

          const result = await response.text()
          console.log(`[Verificação] Resposta: ${result} (esperado: PAYMENT_CONFIRMED)`)

          if (result.trim() === "PAYMENT_CONFIRMED") {
            console.log("[Verificação] Pagamento confirmado! Redirecionando...")

            // Salvar dados do pagamento para a página de confirmação
            localStorage.setItem(
              "paymentConfirmed",
              JSON.stringify({
                paymentId: pixData.paymentId,
                amount: selectedAmount,
                paidAt: new Date().toISOString(),
              }),
            )

            // Redirecionar para página de confirmação
            window.location.href = `/confirmacao?amount=${selectedAmount}&name=${encodeURIComponent(fullName)}&paymentId=${pixData.paymentId}`
          }
        } catch (error) {
          console.error("[Verificação] Erro ao verificar pagamento:", error)
        }
        // Remover finally com setIsCheckingPayment(false)
      }

      // Verificar a cada 8 segundos
      const interval = setInterval(checkPayment, 8000)

      // Verificação inicial após 5 segundos
      const initialCheck = setTimeout(checkPayment, 5000)

      return () => {
        clearInterval(interval)
        clearTimeout(initialCheck)
      }
    }
  }, [showPixCode, pixData, selectedAmount, fullName])

  const contributionOptions = [
    {
      views: "500",
      description: "visualizações do abaixo-assinado",
      amount: 20,
      badge: null,
    },
    {
      views: "1.500",
      description: "visualizações do abaixo-assinado",
      amount: 30,
      badge: "Popular",
    },
    {
      views: "2.000",
      description: "visualizações do abaixo-assinado",
      amount: 40,
      badge: null,
    },
  ]

  const allContributors = [
    { name: "Hilen Gerzwolf", avatar: "HG" },
    { name: "Manoel Inglez", avatar: "MI" },
    { name: "Paulo Santos", avatar: "PS" },
    { name: "Ana Silva", avatar: "AS" },
    { name: "Carlos Mendes", avatar: "CM" },
    { name: "Maria Oliveira", avatar: "MO" },
    { name: "João Ferreira", avatar: "JF" },
    { name: "Lucia Costa", avatar: "LC" },
    { name: "Pedro Alves", avatar: "PA" },
    { name: "Sandra Lima", avatar: "SL" },
    { name: "Roberto Dias", avatar: "RD" },
    { name: "Carmen Rocha", avatar: "CR" },
    { name: "Fernando Souza", avatar: "FS" },
    { name: "Patricia Gomes", avatar: "PG" },
    { name: "Ricardo Moreira", avatar: "RM" },
    { name: "Juliana Barbosa", avatar: "JB" },
    { name: "Marcos Pereira", avatar: "MP" },
    { name: "Camila Rodrigues", avatar: "CR" },
    { name: "Diego Martins", avatar: "DM" },
    { name: "Beatriz Carvalho", avatar: "BC" },
    { name: "Rafael Nascimento", avatar: "RN" },
    { name: "Larissa Freitas", avatar: "LF" },
    { name: "Gustavo Ribeiro", avatar: "GR" },
    { name: "Vanessa Cardoso", avatar: "VC" },
    { name: "Bruno Teixeira", avatar: "BT" },
    { name: "Gabriela Monteiro", avatar: "GM" },
    { name: "Thiago Correia", avatar: "TC" },
    { name: "Amanda Vieira", avatar: "AV" },
    { name: "Leonardo Araújo", avatar: "LA" },
    { name: "Priscila Ramos", avatar: "PR" },
  ]

  const [currentContributors, setCurrentContributors] = useState<
    Array<{ name: string; amount: string; avatar: string }>
  >([])

  // Função para gerar valor aleatório
  const generateRandomAmount = () => {
    const amounts = [15, 20, 25, 30, 35, 40, 45, 50, 60, 75, 80, 85, 90, 100]
    return amounts[Math.floor(Math.random() * amounts.length)]
  }

  // Inicializar contribuidores com valores aleatórios
  useEffect(() => {
    const initialContributors = allContributors
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((contributor) => ({
        ...contributor,
        amount: `R$ ${generateRandomAmount()}`,
      }))

    setCurrentContributors(initialContributors)
  }, [])

  // Sistema de rotação a cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      const newContributors = allContributors
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((contributor) => ({
          ...contributor,
          amount: `R$ ${generateRandomAmount()}`,
        }))

      setCurrentContributors(newContributors)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // Função para calcular visualizações baseado no valor
  const calculateViews = (amount: number) => {
    // R$ 20 = 500 visualizações
    return Math.floor((amount / 20) * 500)
  }

  // Função para gerar texto dinâmico
  const getCalculationText = () => {
    if (selectedAmount > 0) {
      const views = calculateViews(selectedAmount)
      return `Cálculo das visualizações do abaixo-assinado: Para R$ ${selectedAmount.toFixed(2).replace(".", ",")}, o abaixo-assinado será compartilhado ${views.toLocaleString()} vezes para apoiadores em potencial.`
    }
    return "Cálculo das visualizações do abaixo-assinado: Para cada R$ 20, o abaixo-assinado será compartilhado 500 vezes para apoiadores em potencial."
  }

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    const numValue = Number.parseFloat(value)
    if (!isNaN(numValue) && numValue > 0) {
      setSelectedAmount(numValue)
    } else {
      setSelectedAmount(0)
    }
  }

  // Função para formatar CPF
  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1")
  }

  // Função para formatar tempo
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Função para copiar código PIX
  const copyPixCode = async () => {
    if (!pixData) return

    try {
      await navigator.clipboard.writeText(pixData.pixCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      console.error("Erro ao copiar:", err)
    }
  }

  // Função para processar pagamento via webhook Make.com
  const handlePayment = async () => {
    if (selectedAmount > 0 && fullName && cpf) {
      setIsLoading(true)
      setError("")

      try {
        console.log("[Pagamento] Enviando dados para Make.com...")

        const response = await fetch("https://hook.us2.make.com/2b21tusvfj55p19gqwop16hns8prg79c", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nomeCompleto: fullName.trim(),
            Email: email.trim() || `${fullName.replace(/\s+/g, "").toLowerCase()}@email.com`,
            Cpf: cpf,
            valor: selectedAmount.toString(),
          }),
        })

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`)
        }

        const responseText = await response.text()
        console.log("[Pagamento] Resposta bruta recebida:", responseText)
        console.log("[Pagamento] Tipo da resposta:", typeof responseText)
        console.log("[Pagamento] Tamanho da resposta:", responseText.length)

        if (!responseText || responseText.trim() === "") {
          throw new Error("Resposta vazia do servidor")
        }

        // Parse da resposta - tratar formato malformado
        let responseData
        try {
          // Tentar parse direto primeiro
          responseData = JSON.parse(responseText)
          console.log("[Pagamento] Dados parseados (JSON direto):", responseData)
        } catch (parseError) {
          console.log("[Pagamento] Falha no parse direto, tentando corrigir formato...")

          // Se falhar, tentar corrigir o formato adicionando chaves
          let correctedText = responseText.trim()

          // Se não começar com {, adicionar
          if (!correctedText.startsWith("{")) {
            correctedText = "{" + correctedText
          }

          // Se não terminar com }, adicionar
          if (!correctedText.endsWith("}")) {
            correctedText = correctedText + "}"
          }

          console.log("[Pagamento] Texto corrigido:", correctedText)

          try {
            responseData = JSON.parse(correctedText)
            console.log("[Pagamento] Dados parseados (após correção):", responseData)
          } catch (secondParseError) {
            console.error("[Pagamento] Erro no segundo parse:", secondParseError)
            console.error("[Pagamento] Texto que causou erro:", correctedText)

            // Última tentativa: extrair manualmente usando regex
            const pixMatch = correctedText.match(/"pix":\s*'([^']+)'/)
            const idMatch = correctedText.match(/"id":\s*'([^']+)'/)

            if (pixMatch && idMatch) {
              responseData = {
                pix: pixMatch[1],
                id: idMatch[1],
              }
              console.log("[Pagamento] Dados extraídos via regex:", responseData)
            } else {
              throw new Error("Não foi possível extrair dados PIX da resposta")
            }
          }
        }

        // Validar se tem os campos necessários
        if (!responseData.pix || !responseData.id) {
          console.error("[Pagamento] Resposta sem campos obrigatórios:", responseData)
          console.error("[Pagamento] Campo pix existe?", !!responseData.pix)
          console.error("[Pagamento] Campo id existe?", !!responseData.id)
          throw new Error("Dados incompletos na resposta")
        }

        console.log("[Pagamento] PIX gerado com sucesso:", {
          id: responseData.id,
          pixCodeLength: responseData.pix.length,
          pixCodeStart: responseData.pix.substring(0, 50) + "...",
        })

        // Fallback para diferentes formatos de resposta
        const pixCode = responseData.pix || responseData.pixCode || responseData.qrCode
        const paymentId = responseData.id || responseData.paymentId || responseData.transactionId

        if (!pixCode || !paymentId) {
          console.error("[Pagamento] Campos alternativos também não encontrados")
          console.error("[Pagamento] Campos disponíveis:", Object.keys(responseData))
          throw new Error("Código PIX ou ID do pagamento não encontrado")
        }

        console.log("[Pagamento] Usando campos:", { pixCode: pixCode.substring(0, 50) + "...", paymentId })

        // Salvar dados do pagamento para a próxima etapa
        const paymentData = {
          amount: selectedAmount,
          fullName: fullName,
          cpf: cpf,
          email: email,
          pixCode: pixCode,
          paymentId: paymentId,
          timestamp: new Date().toISOString(),
        }

        localStorage.setItem("paymentData", JSON.stringify(paymentData))

        // Criar objeto pixData com os dados retornados
        setPixData({
          pixCode: pixCode,
          paymentId: paymentId,
          value: selectedAmount,
        })

        // Disparar evento Purchase do Facebook Pixel imediatamente quando PIX é gerado
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Purchase", {
            content_name: "Contribuição Abaixo-Assinado PIX Gerado",
            content_category: "Political Donation",
            value: selectedAmount,
            currency: "BRL",
            num_items: 1,
            content_ids: [paymentId],
          })
        }

        setShowPixCode(true)
        setTimeLeft(15 * 60) // Reset timer
      } catch (error: any) {
        console.error("[Pagamento] Erro ao processar pagamento:", error)
        setError(error.message || "Erro ao processar pagamento. Tente novamente.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Função para voltar ao formulário
  const handleBack = () => {
    setShowPixCode(false)
    setPixData(null)
    setError("")
  }

  // Função para verificação manual de pagamento
  const handleManualCheck = async () => {
    if (!pixData) return

    setIsCheckingPayment(true)
    try {
      console.log(`[Verificação Manual] Checando pagamento ID: ${pixData.paymentId}`)

      const response = await fetch(`https://hook.us2.make.com/eggh27mpawl97q2tmewhq3dr4ke2d474?id=${pixData.paymentId}`)

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`)
      }

      const result = await response.text()
      console.log(`[Verificação Manual] Resposta: ${result} (esperado: PAYMENT_CONFIRMED)`)

      if (result.trim() === "PAYMENT_CONFIRMED") {
        console.log("[Verificação Manual] Pagamento confirmado! Redirecionando...")

        // Salvar dados do pagamento para a página de confirmação
        localStorage.setItem(
          "paymentConfirmed",
          JSON.stringify({
            paymentId: pixData.paymentId,
            amount: selectedAmount,
            paidAt: new Date().toISOString(),
          }),
        )

        // Redirecionar para página de confirmação
        window.location.href = `/confirmacao?amount=${selectedAmount}&name=${encodeURIComponent(fullName)}&paymentId=${pixData.paymentId}`
      } else {
        setError("Pagamento ainda não foi detectado. Aguardando confirmação...")
        setTimeout(() => setError(""), 3000)
      }
    } catch (error: any) {
      console.error("[Verificação Manual] Erro:", error)
      setError("Erro ao verificar pagamento. Tente novamente.")
      setTimeout(() => setError(""), 3000)
    } finally {
      setIsCheckingPayment(false)
    }
  }

  // Adicionar este useEffect após os outros useEffects existentes
  useEffect(() => {
    // Enviar evento InitiateCheckout para Facebook Pixel
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "InitiateCheckout", {
        content_name: "Contribuição Abaixo-Assinado",
        content_category: "Political Donation",
        value: selectedAmount || 30,
        currency: "BRL",
        num_items: 1,
      })
    }
  }, [selectedAmount])

  // Se PIX foi gerado, mostrar tela de pagamento
  if (showPixCode && pixData) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-green-600">Abaixo-Assinado</span>
              <span className="text-2xl">🇧🇷</span>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="p-6">
              {/* Header do PIX */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">PIX Gerado com Sucesso!</h1>
                <p className="text-gray-600">Copie o código PIX abaixo</p>
              </div>

              {/* Timer */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-2 text-orange-700">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">Tempo restante: {formatTime(timeLeft)}</span>
                </div>
                <p className="text-center text-sm text-orange-600 mt-1">O código PIX expira em 15 minutos</p>
              </div>

              {/* Código PIX */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Código PIX (Copia e Cola)</label>
                <div className="flex gap-2 mb-2">
                  <Input value={pixData.pixCode} readOnly className="font-mono text-xs" style={{ fontSize: "16px" }} />
                  <ActionButton
                    onClick={copyPixCode}
                    disabled={false}
                    variant="secondary"
                    className={`px-4 h-12 ${copied ? "bg-green-50 border-green-200" : ""}`}
                  >
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  </ActionButton>
                </div>
                {copied && <p className="text-sm text-green-600">Código copiado!</p>}
              </div>

              {/* Instruções */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Como pagar:</h3>
                <ol className="text-sm text-gray-700 space-y-1">
                  <li>1. Abra o app do seu banco</li>
                  <li>2. Escolha a opção PIX</li>
                  <li>3. Cole o código PIX copiado</li>
                  <li>4. Confirme o pagamento</li>
                  <li>5. O sistema detectará automaticamente o pagamento</li>
                </ol>
              </div>

              {/* Botões de Ação */}
              <div className="space-y-3">
                <ActionButton
                  onClick={() => {
                    // Redirecionar diretamente para página de confirmação
                    window.location.href = `/confirmacao?amount=${selectedAmount}&name=${encodeURIComponent(fullName)}&paymentId=${pixData.paymentId}`
                  }}
                  variant="primary"
                  className="w-full"
                  loading={false}
                >
                  <Check className="w-5 h-5 mr-2" />
                  Já paguei o PIX
                </ActionButton>

                <ActionButton onClick={handleBack} variant="secondary" className="w-full">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Gerar novo código
                </ActionButton>
              </div>

              {/* Info sobre verificação automática */}
              <div className="mt-4 text-center text-sm text-gray-600">
                <p>💡 O pagamento é verificado automaticamente a cada 8 segundos</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">Abaixo-Assinado</span>
            <span className="text-2xl">🇧🇷</span>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8 px-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="w-4 sm:w-8 border-t border-gray-300"></div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              2
            </div>
            <div className="w-4 sm:w-8 border-t border-gray-300"></div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
              3
            </div>
          </div>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-red-700 font-medium">Erro no pagamento</div>
                  <div className="text-red-600 text-sm mt-1">{error}</div>
                </div>
              </div>
            )}

            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
              Incrível, {firstName}! Com quanto você pode ajudar agora?
            </h1>

            {/* Recent Contributors */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto py-2">
              {currentContributors.map((contributor, index) => (
                <div
                  key={`${contributor.name}-${index}-${contributor.amount}`}
                  className="flex-shrink-0 flex items-center gap-2 animate-in fade-in duration-500"
                >
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200">
                    <AvatarFallback className="text-xs font-medium text-gray-700">{contributor.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="text-xs sm:text-sm">
                    <div className="font-medium text-gray-900">{contributor.name}</div>
                    <div className="text-gray-600">contribuiu com {contributor.amount}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contribution Options */}
            <div className="space-y-3 mb-6">
              {contributionOptions.map((option, index) => (
                <div
                  key={index}
                  className={`border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition-all duration-200 ${
                    selectedAmount === option.amount
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleAmountSelect(option.amount)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{option.views}</span>
                        <span className="text-gray-700 text-sm">{option.description}</span>
                        {option.badge && (
                          <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                            <Star className="w-3 h-3 fill-current" />
                            {option.badge}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="font-bold text-gray-900">R$ {option.amount}</div>
                  </div>
                </div>
              ))}

              {/* Custom Amount */}
              <div
                className={`border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition-all duration-200 ${
                  customAmount ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">R$</span>
                    <Input
                      type="number"
                      placeholder="0"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      className="border-0 p-0 h-auto text-gray-900 font-medium bg-transparent focus:ring-0 w-20"
                      min="1"
                      step="0.01"
                      style={{ fontSize: "16px" }}
                    />
                  </div>
                  <span className="text-gray-600">Outro</span>
                </div>
              </div>
            </div>

            {/* Dynamic Explanation Text */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-700">
                <span className="font-medium">{getCalculationText()}</span>
              </p>
            </div>

            {/* Payment Method - PIX Simplificado */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-4">Método de pagamento</h3>

              {/* PIX Option - Design mais simples */}
              <div className="border border-gray-300 rounded-lg p-3 mb-4 bg-white">
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">PIX</span>
                  </div>
                  <span className="font-medium">PIX - Instantâneo</span>
                </div>
              </div>

              {/* PIX Form Fields */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="text-sm font-medium text-gray-700 block mb-1">
                    Nome Completo *
                  </label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1 h-10 sm:h-12"
                    placeholder="Digite seu nome completo"
                    style={{ fontSize: "16px" }}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="cpf" className="text-sm font-medium text-gray-700 block mb-1">
                    CPF *
                  </label>
                  <Input
                    id="cpf"
                    value={cpf}
                    onChange={(e) => setCpf(formatCPF(e.target.value))}
                    className="mt-1 h-10 sm:h-12"
                    placeholder="000.000.000-00"
                    maxLength={14}
                    style={{ fontSize: "16px" }}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1">
                    Email (opcional)
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 h-10 sm:h-12"
                    placeholder="seu@email.com"
                    style={{ fontSize: "16px" }}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button - Usando o componente padronizado */}
            <ActionButton
              onClick={handlePayment}
              disabled={selectedAmount === 0 || !fullName || !cpf}
              loading={isLoading}
              variant="secondary"
              className="mb-4"
            >
              <span className="text-base sm:text-lg">🔒</span>
              <span className="font-bold text-sm sm:text-base">
                Contribuir com R$ {selectedAmount.toFixed(2).replace(".", ",")}
              </span>
            </ActionButton>

            {/* Checkbox */}
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-3">
                <input type="checkbox" id="show-name" className="mt-1 w-4 h-4 text-blue-600" />
                <label htmlFor="show-name" className="text-sm text-gray-700">
                  Exibir meu nome e o valor que investi na petição
                </label>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 text-xs text-gray-600">
              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
              </div>
              <p className="text-xs sm:text-sm">
                Ao contribuir, você concorda com os{" "}
                <a href="#" className="text-blue-600 underline">
                  Termos de Uso
                </a>{" "}
                e com a{" "}
                <a href="#" className="text-blue-600 underline">
                  Política de Privacidade
                </a>
                . Processamento seguro de pagamentos fornecido por PIX.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
