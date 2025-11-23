"use client";

import { useState } from "react";
import { Sun, Zap, TrendingUp, Award, Calculator, CheckCircle2, XCircle, Sparkles, ArrowRight, MapPin, Home, Building2, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CalculationResult {
  monthlyConsumption: number;
  systemSize: number;
  panelsNeeded: number;
  estimatedCost: number;
  monthlySavings: number;
  paybackYears: number;
  co2Reduction: number;
}

interface Suggestion {
  id: number;
  title: string;
  description: string;
  status: "pending" | "accepted" | "rejected";
}

type InstallationType = "solo" | "fibrocimento" | "colonial" | "laje" | null;

export default function Home() {
  const [step, setStep] = useState<"welcome" | "calculator" | "results" | "installation">("welcome");
  const [monthlyBill, setMonthlyBill] = useState("");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [installationType, setInstallationType] = useState<InstallationType>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    { id: 1, title: "Painel Solar Premium 550W", description: "Alta eficiência para máxima geração", status: "pending" },
    { id: 2, title: "Inversor Inteligente 5kW", description: "Monitoramento em tempo real", status: "pending" },
    { id: 3, title: "Sistema de Armazenamento", description: "Bateria para uso noturno", status: "pending" },
  ]);

  const calculateSolar = () => {
    const bill = parseFloat(monthlyBill);
    if (isNaN(bill) || bill <= 0) return;

    const avgTariff = 0.85; // R$/kWh
    const monthlyConsumption = bill / avgTariff;
    const systemSize = (monthlyConsumption * 12) / 1350; // kWp
    const panelsNeeded = Math.ceil(systemSize / 0.55); // 550W panels
    const estimatedCost = systemSize * 4500; // R$/kWp
    const monthlySavings = bill * 0.95;
    const paybackYears = estimatedCost / (monthlySavings * 12);
    const co2Reduction = monthlyConsumption * 0.0847 * 12; // kg CO2/ano

    setResult({
      monthlyConsumption,
      systemSize,
      panelsNeeded,
      estimatedCost,
      monthlySavings,
      paybackYears,
      co2Reduction,
    });

    setStep("results");
    addPoints(50);
  };

  const addPoints = (amount: number) => {
    const newPoints = points + amount;
    setPoints(newPoints);
    const newLevel = Math.floor(newPoints / 100) + 1;
    setLevel(newLevel);
  };

  const handleSuggestion = (id: number, action: "accepted" | "rejected") => {
    setSuggestions(prev =>
      prev.map(s => (s.id === id ? { ...s, status: action } : s))
    );
    addPoints(action === "accepted" ? 20 : 10);
  };

  const resetCalculator = () => {
    setStep("calculator");
    setMonthlyBill("");
    setResult(null);
    setInstallationType(null);
  };

  const goToInstallation = () => {
    setStep("installation");
    addPoints(30);
  };

  const handleInstallationSubmit = () => {
    if (!installationType) return;
    addPoints(40);
    alert(`Tipo de instalação selecionado: ${installationType}. Sistema configurado com sucesso!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-orange-500 to-yellow-500 p-2 rounded-lg">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Solary
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full">
              <Award className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-purple-900">Nível {level}</span>
              <Badge variant="secondary" className="bg-purple-200 text-purple-900">{points} pts</Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Screen */}
        {step === "welcome" && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-full mb-4">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Bem-vindo ao Futuro da Energia</span>
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-4">
                Economize até <span className="text-orange-600">95%</span> na sua conta de luz
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Calcule seu sistema solar personalizado em segundos e descubra quanto você pode economizar
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="border-2 hover:border-orange-300 transition-all hover:shadow-xl">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mb-4">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Cálculo Preciso</CardTitle>
                  <CardDescription>
                    Sistema inteligente que calcula o tamanho ideal do seu projeto solar
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-green-300 transition-all hover:shadow-xl">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Economia Real</CardTitle>
                  <CardDescription>
                    Veja quanto você vai economizar mês a mês e o retorno do investimento
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-purple-300 transition-all hover:shadow-xl">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Gamificação</CardTitle>
                  <CardDescription>
                    Ganhe pontos e suba de nível enquanto explora soluções solares
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
                onClick={() => setStep("calculator")}
              >
                <Zap className="w-5 h-5 mr-2" />
                Começar Cálculo Gratuito
              </Button>
            </div>
          </div>
        )}

        {/* Calculator Screen */}
        {step === "calculator" && (
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl">Calculadora Solar</CardTitle>
                <CardDescription className="text-base">
                  Informe o valor da sua conta de luz para calcular seu sistema ideal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bill" className="text-lg">Valor médio da conta de luz (R$)</Label>
                  <Input
                    id="bill"
                    type="number"
                    placeholder="Ex: 450,00"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(e.target.value)}
                    className="text-lg p-6"
                  />
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={calculateSolar}
                    disabled={!monthlyBill}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-6 text-lg"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Calcular Sistema
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setStep("welcome")}
                    className="py-6"
                  >
                    Voltar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results Screen */}
        {step === "results" && result && (
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center">
              <Badge className="bg-green-100 text-green-800 mb-4 px-4 py-2 text-base">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Cálculo Concluído! +50 pontos
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Seu Sistema Solar Ideal</h2>
              <p className="text-gray-600">Confira os detalhes do seu projeto personalizado</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
                <CardHeader>
                  <CardDescription>Potência do Sistema</CardDescription>
                  <CardTitle className="text-3xl text-orange-600">
                    {result.systemSize.toFixed(2)} kWp
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{result.panelsNeeded} painéis de 550W</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                <CardHeader>
                  <CardDescription>Economia Mensal</CardDescription>
                  <CardTitle className="text-3xl text-green-600">
                    R$ {result.monthlySavings.toFixed(2)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">95% de redução na conta</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardHeader>
                  <CardDescription>Investimento Total</CardDescription>
                  <CardTitle className="text-3xl text-blue-600">
                    R$ {result.estimatedCost.toLocaleString('pt-BR')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Retorno em {result.paybackYears.toFixed(1)} anos</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader>
                  <CardDescription>Impacto Ambiental</CardDescription>
                  <CardTitle className="text-3xl text-purple-600">
                    {result.co2Reduction.toFixed(0)} kg
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">CO₂ evitado por ano</p>
                </CardContent>
              </Card>
            </div>

            {/* Suggestions Section */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                  Sugestões Personalizadas
                </CardTitle>
                <CardDescription>
                  Avalie as recomendações e ganhe pontos por cada interação
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestions.map((suggestion) => (
                  <div 
                    key={suggestion.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      suggestion.status === "accepted" 
                        ? "bg-green-50 border-green-300" 
                        : suggestion.status === "rejected"
                        ? "bg-red-50 border-red-300"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-1">{suggestion.title}</h4>
                        <p className="text-gray-600">{suggestion.description}</p>
                      </div>
                      
                      {suggestion.status === "pending" ? (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-300 text-green-700 hover:bg-green-50"
                            onClick={() => handleSuggestion(suggestion.id, "accepted")}
                          >
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Aceitar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-700 hover:bg-red-50"
                            onClick={() => handleSuggestion(suggestion.id, "rejected")}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Descartar
                          </Button>
                        </div>
                      ) : (
                        <Badge 
                          variant={suggestion.status === "accepted" ? "default" : "destructive"}
                          className="whitespace-nowrap"
                        >
                          {suggestion.status === "accepted" ? "✓ Aceito (+20 pts)" : "✗ Descartado (+10 pts)"}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Progress Section */}
            <Card className="border-2 bg-gradient-to-r from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Seu Progresso</span>
                  <Badge className="bg-purple-600 text-white">Nível {level}</Badge>
                </CardTitle>
                <CardDescription>
                  Continue interagindo para ganhar mais pontos e subir de nível
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Pontos: {points}</span>
                    <span className="text-gray-600">Próximo nível: {level * 100}</span>
                  </div>
                  <Progress value={(points % 100)} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Next Step Button */}
            <div className="text-center space-y-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
                onClick={goToInstallation}
              >
                Próxima Etapa: Local de Instalação
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <div>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={resetCalculator}
                  className="px-8 py-6 text-lg"
                >
                  Fazer Novo Cálculo
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Installation Type Screen */}
        {step === "installation" && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <Badge className="bg-blue-100 text-blue-800 mb-4 px-4 py-2 text-base">
                <MapPin className="w-4 h-4 mr-2" />
                Etapa 2 de 2 - +30 pontos
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Local de Instalação</h2>
              <p className="text-gray-600">Onde será instalado seu sistema de geração de energia solar?</p>
            </div>

            <Card className="border-2 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Escolha o tipo de instalação</CardTitle>
                <CardDescription className="text-base">
                  Selecione a opção que melhor descreve onde os painéis solares serão instalados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup value={installationType || ""} onValueChange={(value) => setInstallationType(value as InstallationType)}>
                  <div className="space-y-4">
                    {/* Opção 1: Solo */}
                    <label htmlFor="solo" className="cursor-pointer">
                      <div className={`flex items-start gap-4 p-6 rounded-lg border-2 transition-all ${
                        installationType === "solo" 
                          ? "border-orange-500 bg-orange-50" 
                          : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50"
                      }`}>
                        <RadioGroupItem value="solo" id="solo" className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                              <Mountain className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-semibold text-lg">No Solo</h3>
                          </div>
                          <p className="text-gray-600">Instalação em área aberta no terreno, ideal para grandes espaços</p>
                        </div>
                      </div>
                    </label>

                    {/* Opção 2: Telhado de Fibrocimento */}
                    <label htmlFor="fibrocimento" className="cursor-pointer">
                      <div className={`flex items-start gap-4 p-6 rounded-lg border-2 transition-all ${
                        installationType === "fibrocimento" 
                          ? "border-orange-500 bg-orange-50" 
                          : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50"
                      }`}>
                        <RadioGroupItem value="fibrocimento" id="fibrocimento" className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                              <Home className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-semibold text-lg">Telhado de Fibrocimento</h3>
                          </div>
                          <p className="text-gray-600">Telhado com telhas de fibrocimento (eternit), comum em galpões e residências</p>
                        </div>
                      </div>
                    </label>

                    {/* Opção 3: Telha Colonial */}
                    <label htmlFor="colonial" className="cursor-pointer">
                      <div className={`flex items-start gap-4 p-6 rounded-lg border-2 transition-all ${
                        installationType === "colonial" 
                          ? "border-orange-500 bg-orange-50" 
                          : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50"
                      }`}>
                        <RadioGroupItem value="colonial" id="colonial" className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                              <Home className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-semibold text-lg">Telha Colonial</h3>
                          </div>
                          <p className="text-gray-600">Telhas de cerâmica tradicionais, muito comuns em residências brasileiras</p>
                        </div>
                      </div>
                    </label>

                    {/* Opção 4: Laje */}
                    <label htmlFor="laje" className="cursor-pointer">
                      <div className={`flex items-start gap-4 p-6 rounded-lg border-2 transition-all ${
                        installationType === "laje" 
                          ? "border-orange-500 bg-orange-50" 
                          : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50"
                      }`}>
                        <RadioGroupItem value="laje" id="laje" className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                              <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-semibold text-lg">Laje</h3>
                          </div>
                          <p className="text-gray-600">Cobertura plana de concreto, comum em prédios e casas modernas</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </RadioGroup>

                <div className="flex gap-4 pt-4">
                  <Button 
                    onClick={handleInstallationSubmit}
                    disabled={!installationType}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-6 text-lg"
                  >
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Confirmar Instalação (+40 pts)
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setStep("results")}
                    className="py-6"
                  >
                    Voltar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Progress Section */}
            <Card className="border-2 bg-gradient-to-r from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Seu Progresso</span>
                  <Badge className="bg-purple-600 text-white">Nível {level}</Badge>
                </CardTitle>
                <CardDescription>
                  Continue interagindo para ganhar mais pontos e subir de nível
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Pontos: {points}</span>
                    <span className="text-gray-600">Próximo nível: {level * 100}</span>
                  </div>
                  <Progress value={(points % 100)} className="h-3" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p className="flex items-center justify-center gap-2">
            <Sun className="w-5 h-5 text-orange-500" />
            <span>Solary - Transformando luz solar em economia real</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
