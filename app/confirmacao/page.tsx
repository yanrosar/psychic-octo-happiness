"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Heart, Users, MessageCircle, Share2, Crown, Star } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { ActionButton } from "@/components/ui/action-button"

export default function ConfirmacaoPage() {
  const searchParams = useSearchParams()
  const amount = Number.parseFloat(searchParams.get("amount") || "30")
  const name = searchParams.get("name") || "Patriota"

  const [paymentData, setPaymentData] = useState<any>(null)
  const [showConfetti, setShowConfetti] = useState(true)
  const [copiedPetition, setCopiedPetition] = useState(false)

  useEffect(() => {
    // Buscar dados do pagamento
    const storedPaymentData = localStorage.getItem("paymentData")
    if (storedPaymentData) {
      try {
        const data = JSON.parse(storedPaymentData)
        setPaymentData(data)
      } catch (e) {
        console.error("Erro ao parsear dados do pagamento:", e)
      }
    }

    // Remover confetti após 3 segundos
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Adicionar este useEffect após os useEffects existentes
  useEffect(() => {
    // Enviar evento Purchase para Facebook Pixel
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Purchase", {
        content_name: "Contribuição Abaixo-Assinado Confirmada",
        content_category: "Political Donation",
        value: amount,
        currency: "BRL",
        num_items: 1,
        content_ids: [paymentData?.paymentId || "unknown"],
      })
    }
  }, [amount, paymentData])

  // Remover ou comentar este useEffect
  /*
  useEffect(() => {
    // Enviar evento Purchase para Facebook Pixel
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Purchase", {
        content_name: "Contribuição Abaixo-Assinado Confirmada",
        content_category: "Political Donation",
        value: amount,
        currency: "BRL",
        num_items: 1,
        content_ids: [paymentData?.paymentId || "unknown"],
      })
    }
  }, [amount, paymentData])
  */

  const handleJoinGroup = () => {
    // Redirecionar para o grupo real do WhatsApp
    window.open("https://chat.whatsapp.com/GpYNtQlErfxDBz62niyA8h?mode=ac_c", "_blank")
  }

  const handleSharePetition = async () => {
    const petitionLink = "https://abaixo-assinado.com.br/impeachment-lula-2024"
    try {
      await navigator.clipboard.writeText(petitionLink)
      setCopiedPetition(true)
      setTimeout(() => setCopiedPetition(false), 3000)
    } catch (err) {
      console.error("Erro ao copiar link:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          <div className="absolute top-0 left-1/4 w-1 h-1 bg-green-500 rounded-full animate-bounce sm:w-2 sm:h-2"></div>
          <div className="absolute top-10 left-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce delay-100 sm:w-3 sm:h-3"></div>
          <div className="absolute top-5 right-1/4 w-1 h-1 bg-blue-500 rounded-full animate-bounce delay-200 sm:w-2 sm:h-2"></div>
          <div className="absolute top-20 right-1/3 w-1 h-1 bg-red-500 rounded-full animate-bounce delay-300 sm:w-2 sm:h-2"></div>
          <div className="absolute top-8 left-1/3 w-1 h-1 bg-purple-500 rounded-full animate-bounce delay-150 sm:w-2 sm:h-2"></div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">Abaixo-Assinado</span>
            <span className="text-2xl">🇧🇷</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-20">
        {/* Progress Steps - Completed */}
        <div className="flex items-center justify-center mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center sm:w-8 sm:h-8">
              <Check className="w-3 h-3 text-white sm:w-5 sm:h-5" />
            </div>
            <div className="w-4 border-t border-green-500 sm:w-8"></div>
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center sm:w-8 sm:h-8">
              <Check className="w-3 h-3 text-white sm:w-5 sm:h-5" />
            </div>
            <div className="w-4 border-t border-green-500 sm:w-8"></div>
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center sm:w-8 sm:h-8">
              <Check className="w-3 h-3 text-white sm:w-5 sm:h-5" />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 relative sm:w-20 sm:h-20">
            <Heart className="w-8 h-8 text-green-600 fill-current animate-pulse sm:w-10 sm:h-10" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center sm:-top-2 sm:-right-2 sm:w-8 sm:h-8">
              <Crown className="w-3 h-3 text-yellow-800 sm:w-4 sm:h-4" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            🎉 Parabéns, {name.split(" ")[0]}!
          </h1>
          <p className="text-lg text-gray-700 mb-1 sm:mb-2">Sua contribuição foi confirmada com sucesso!</p>
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold sm:px-4 sm:py-2">
            <Check className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>R$ {amount.toFixed(2).replace(".", ",")} • Pagamento Confirmado</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Left Column - Payment Confirmation */}
          <div className="space-y-4 sm:space-y-6">
            {/* Payment Details */}
            <Card className="border-2 border-green-200 bg-green-50">
              <CardHeader className="px-4 pt-4 pb-2">
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Check className="w-5 h-5 sm:w-6 sm:h-6" />
                  Detalhes da Contribuição
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 px-4 pb-4 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Valor contribuído:</span>
                  <span className="text-xl font-bold text-green-600">R$ {amount.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Contribuidor:</span>
                  <span className="font-medium text-gray-900">{name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Data:</span>
                  <span className="font-medium text-gray-900">
                    {new Date().toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Status:</span>
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="font-medium">Confirmado</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Impact Message */}
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="pt-4 sm:pt-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Star className="w-6 h-6 text-blue-600 fill-current sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-blue-800 mb-1 sm:mb-2">Seu Impacto</h3>
                  <p className="text-blue-700 mb-2 sm:mb-4">
                    Com sua contribuição de R$ {amount.toFixed(2).replace(".", ",")}, o abaixo-assinado será
                    compartilhado aproximadamente{" "}
                    <span className="font-bold">{Math.floor((amount / 20) * 500).toLocaleString()} vezes</span> para
                    apoiadores em potencial!
                  </p>
                  <div className="bg-white p-2 rounded-lg border border-blue-200 sm:p-3">
                    <p className="text-xs text-blue-600 font-medium sm:text-sm">
                      🚀 Você está ajudando a amplificar a voz de milhões de brasileiros!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Group Invitation */}
          <div className="space-y-4 sm:space-y-6">
            {/* VIP Group Invitation */}
            <Card className="border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-200 rounded-full -mr-8 -mt-8 opacity-50 sm:w-20 sm:h-20 sm:-mr-10 sm:-mt-10"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-orange-200 rounded-full -ml-6 -mb-6 opacity-50 sm:w-16 sm:h-16 sm:-ml-8 sm:-mb-8"></div>
              <CardHeader className="relative px-4 pt-4 pb-2">
                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center sm:w-8 sm:h-8">
                    <Crown className="w-4 h-4 text-yellow-800 sm:w-5 sm:h-5" />
                  </div>
                  <span className="bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded-full text-[0.6rem] font-bold uppercase tracking-wide sm:px-2 sm:py-1 sm:text-xs">
                    Exclusivo
                  </span>
                </div>
                <CardTitle className="text-xl text-yellow-800 sm:text-2xl">🔥 Grupo VIP de Acompanhamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 relative px-4 pb-4 sm:space-y-4">
                <p className="text-yellow-700 font-medium">
                  Como contribuidor, você tem acesso exclusivo ao nosso grupo VIP onde você receberá:
                </p>
                <ul className="space-y-1 text-yellow-700 sm:space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-yellow-600 sm:w-4 sm:h-4" />
                    <span>Atualizações em tempo real sobre o impeachment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-yellow-600 sm:w-4 sm:h-4" />
                    <span>Análises exclusivas e bastidores políticos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-yellow-600 sm:w-4 sm:h-4" />
                    <span>Estratégias de mobilização e ação</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-yellow-600 sm:w-4 sm:h-4" />
                    <span>Conexão com outros patriotas engajados</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-yellow-600 sm:w-4 sm:h-4" />
                    <span>Primeiros a saber sobre vitórias e avanços</span>
                  </li>
                </ul>

                <div className="bg-white p-3 rounded-lg border-2 border-yellow-300 mt-4 sm:mt-6">
                  <div className="flex items-center gap-3 mb-2 sm:mb-3">
                    <Users className="w-5 h-5 text-yellow-600 sm:w-6 sm:h-6" />
                    <div>
                      <div className="font-bold text-yellow-800">+2.847 patriotas conectados</div>
                      <div className="text-sm text-yellow-600">Crescendo a cada minuto</div>
                    </div>
                  </div>
                  <ActionButton onClick={handleJoinGroup} variant="success" className="h-12 sm:h-14">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-bold text-sm sm:text-base">🚀 ENTRAR NO GRUPO VIP</span>
                  </ActionButton>
                </div>

                <div className="text-center">
                  <p className="text-[0.6rem] text-yellow-600 sm:text-xs">
                    ⚡ Acesso limitado apenas para contribuidores • 100% Gratuito
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-2xl shadow-xl sm:p-6">
            <h2 className="text-xl font-bold mb-1 sm:text-2xl sm:mb-2">🇧🇷 PELO BRASIL, PELA DEMOCRACIA!</h2>
            <p className="text-red-100 mb-2 sm:mb-4">
              Sua contribuição e engajamento são fundamentais para o sucesso desta causa. Obrigado por fazer parte da
              história!
            </p>
            <div className="flex flex-col gap-3 justify-center sm:flex-row sm:gap-4">
              <ActionButton
                onClick={handleJoinGroup}
                variant="primary"
                className="bg-white text-red-600 hover:bg-gray-100 py-3 sm:py-4"
              >
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-bold text-sm sm:text-base">Entrar no Grupo VIP</span>
              </ActionButton>
              <ActionButton
                onClick={handleSharePetition}
                variant="primary"
                className="border-white text-white hover:bg-white hover:text-red-600 bg-transparent border-2 py-3 sm:py-4"
              >
                {copiedPetition ? (
                  <>
                    <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-bold text-sm sm:text-base">Link Copiado!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-bold text-sm sm:text-base">Compartilhar Abaixo-Assinado</span>
                  </>
                )}
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
