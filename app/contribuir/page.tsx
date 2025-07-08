"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ActionButton } from "@/components/ui/action-button"

const ContribuirPage = () => {
  const [firstName, setFirstName] = useState<string>("Yan")

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Tentar pegar o nome de diferentes fontes
      const urlParams = new URLSearchParams(window.location.search)
      const firstNameFromParams = urlParams.get("firstName") || urlParams.get("name")
      const firstNameFromStorage = localStorage.getItem("firstName") || localStorage.getItem("signatureFirstName")
      const firstNameFromSession = sessionStorage.getItem("firstName") || sessionStorage.getItem("signatureFirstName")

      const capturedName = firstNameFromParams || firstNameFromStorage || firstNameFromSession

      if (capturedName && capturedName.trim() !== "") {
        setFirstName(capturedName.trim())
      }
    }
  }, [])

  useEffect(() => {
    // Função para capturar nome de assinatura anterior
    const checkForSignatureData = () => {
      const signatureData = localStorage.getItem("lastSignature")
      if (signatureData) {
        try {
          const data = JSON.parse(signatureData)
          if (data.firstName) {
            setFirstName(data.firstName)
          }
        } catch (e) {
          console.log("Erro ao parsear dados de assinatura")
        }
      }
    }

    checkForSignatureData()
  }, [])

  const [contributors, setContributors] = useState<Array<{ id: number; name: string; amount: string; avatar: string }>>(
    [],
  )
  const [currentContributors, setCurrentContributors] = useState<
    Array<{ name: string; amount: string; avatar: string }>
  >([])

  const allContributors = [
    { name: "João Victor da Costa Cordeiro", amount: "R$ 25", avatar: "JV" },
    { name: "Gabriel Ferraz Duque", amount: "R$ 85", avatar: "GF" },
    { name: "EDVALDO GOMIDES", amount: "R$ 15", avatar: "EG" },
    { name: "Paulo Teodoro Do Nascimento", amount: "R$ 100", avatar: "PT" },
    { name: "Monica Pereira de mello", amount: "R$ 30", avatar: "MP" },
    { name: "Soraia Motta", amount: "R$ 45", avatar: "SM" },
    { name: "Paulo Afonso Borges Borges", amount: "R$ 60", avatar: "PB" },
    { name: "Gustavo Guedes da Silva", amount: "R$ 20", avatar: "GS" },
    { name: "Andre Munaro", amount: "R$ 75", avatar: "AM" },
    { name: "Janisse Oliveira", amount: "R$ 10", avatar: "JO" },
    { name: "cassiano lourenço", amount: "R$ 35", avatar: "CL" },
    { name: "Paulo Renato Wetzel", amount: "R$ 55", avatar: "PW" },
    { name: "Mark De Mello", amount: "R$ 90", avatar: "MM" },
    { name: "Lincoln Barros de Sousa", amount: "R$ 40", avatar: "LB" },
    { name: "Manoel Inglez da Silva Júnior", amount: "R$ 65", avatar: "MI" },
    { name: "Hilan Gerzvolf", amount: "R$ 18", avatar: "HG" },
    { name: "Belton Gomes da silva Filho Gomes", amount: "R$ 80", avatar: "BG" },
    { name: "Erick Torres", amount: "R$ 22", avatar: "ET" },
    { name: "ERNANI TAROUCO MENNA", amount: "R$ 95", avatar: "EM" },
    { name: "Bady Marao", amount: "R$ 12", avatar: "BM" },
  ]

  // Inicializar com alguns contribuidores
  useEffect(() => {
    setCurrentContributors(allContributors.slice(0, 12))
  }, [])

  // Sistema de rotação de contribuidores a cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentContributors((prev) => {
        const shuffled = [...allContributors].sort(() => Math.random() - 0.5)
        return shuffled.slice(0, 12)
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleContribute = () => {
    // Salvar o nome para a próxima etapa
    localStorage.setItem("contributorName", firstName)
    window.location.href = "/checkout"
  }

  const handleShare = () => {
    window.location.href = "/"
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              1
            </div>
            <div className="w-8 border-t border-gray-300"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
              2
            </div>
            <div className="w-8 border-t border-gray-300"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
              3
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Banner Image */}
            <div className="relative">
              <div className="w-full h-48 md:h-64 bg-gradient-to-r from-green-600 to-yellow-500 rounded-lg flex items-center justify-center text-white">
                <div className="text-center">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">DO IMPEACHMENT</h1>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">CONTRA LULA!</h2>
                  <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold text-xl">ASSINE!</div>
                </div>
              </div>
            </div>

            {/* Content Card */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  {firstName}, seu apoio ainda pode ser maior!
                </h2>

                <p className="text-gray-700 mb-6">
                  As verdadeiras mudanças geralmente exigem um esforço coletivo. Ajude este abaixo-assinado a chegar a
                  outras pessoas comprometidas com a construção de um mundo melhor.
                </p>

                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                  Você poderia contribuir com qualquer valor para ajudar este abaixo-assinado a ganhar visibilidade?
                </h3>

                <p className="text-gray-700 mb-6">
                  Para que este grito de esperança ganhe voo e alcance todo o país, precisamos do seu apoio. Sua
                  contribuição, de qualquer valor, é o combustível que nos permite levar esta mensagem a mais e mais
                  patriotas.
                </p>
                <p className="text-gray-700 mb-6">
                  Não se trata apenas de assinar, mas de lutar. É a nossa união que trará a mudança e garantirá um lar
                  seguro e próspero para nossos filhos e netos.{" "}
                  <span className="font-semibold text-gray-900">Faça sua parte. Pelo Brasil. Pela sua família.</span>
                </p>

                {/* Progress Section - Melhorada */}
                <div className="mb-8">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 border border-blue-100">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-bold text-blue-700 uppercase tracking-wide">IMPACTO</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-blue-600 font-medium">Em tempo real</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-end mb-4">
                      <div className="text-center">
                        <div className="text-3xl sm:text-4xl font-black text-blue-600 mb-1">1.596</div>
                        <div className="text-sm text-gray-600 font-medium">Contribuições</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl sm:text-4xl font-black text-gray-400 mb-1">2.000</div>
                        <div className="text-sm text-gray-600 font-medium">Próxima meta</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-600">Progresso</span>
                        <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-bold">79.8%</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 h-4 rounded-full transition-all duration-1000 ease-out relative"
                          style={{ width: "79.8%" }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/70 rounded-lg p-4 border border-blue-100">
                      <p className="text-sm text-gray-700 text-center">
                        <span className="font-bold text-blue-600">1.596 heróis</span> já contribuíram para ajudar este
                        abaixo-assinado a alcançar sua meta.{" "}
                        <span className="font-semibold">Faltam apenas 404 contribuições!</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Usando o componente padronizado */}
                <div className="space-y-4">
                  <ActionButton onClick={handleContribute} variant="primary" subtitle="Qualquer valor faz a diferença">
                    <span className="text-lg sm:text-xl">🚀</span>
                    <span className="font-black tracking-wide text-sm sm:text-base leading-tight">
                      CONTRIBUIR AGORA - PELO BRASIL!
                    </span>
                    <span className="text-lg sm:text-xl">🇧🇷</span>
                  </ActionButton>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Contributors List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contribuidores recentes</h3>
            <div className="space-y-3 max-h-96 overflow-hidden">
              {currentContributors.map((contributor, index) => (
                <div
                  key={`${contributor.name}-${index}`}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100 animate-in fade-in duration-500"
                >
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200">
                    <AvatarFallback className="text-sm font-medium text-gray-700">{contributor.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">{contributor.name}</div>
                    <div className="text-xs text-gray-600">contribuiu com {contributor.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
            <div className="text-2xl">🤝</div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Junte-se à comunidade!</h3>
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">1.596 pessoas contribuíram</span> para manter esta petição em destaque.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContribuirPage
