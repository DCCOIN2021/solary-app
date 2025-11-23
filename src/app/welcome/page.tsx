'use client'

import { useState, useEffect } from 'react';
import { Logo } from '@/components/Logo';
import { useRouter } from 'next/navigation';
import { Sparkles, TrendingUp, Sun, Zap, Award } from 'lucide-react';

export default function Welcome() {
  const [monthlyBill, setMonthlyBill] = useState('');
  const [budget, setBudget] = useState<any>(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  const motivationalQuotes = [
    "O sol brilha para todos. Aproveite essa energia limpa e renovável! ☀️",
    "Cada raio de sol é uma oportunidade de economia. Invista no seu futuro! 🌟",
    "Energia solar: o investimento que se paga sozinho! 💰",
    "Transforme luz solar em economia real. Seu bolso agradece! ⚡",
    "Seja parte da revolução energética. O futuro é solar! 🚀"
  ];

  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  const handleCalculate = () => {
    const bill = parseFloat(monthlyBill);
    if (isNaN(bill) || bill <= 0) {
      alert('Por favor, insira um valor válido para a conta de energia.');
      return;
    }

    const averageRate = 0.85;
    const requiredGeneration = bill / averageRate;
    const systemCostPerKwh = 5000;
    const estimatedCost = (requiredGeneration / 150) * systemCostPerKwh;
    const monthlySavings = bill * 0.95;
    const panelQuantity = Math.ceil(requiredGeneration / 150);
    const paybackYears = (estimatedCost / (monthlySavings * 12)).toFixed(1);
    const savings25Years = (monthlySavings * 12 * 25 - estimatedCost).toFixed(2);

    setBudget({
      requiredGeneration: requiredGeneration.toFixed(2),
      estimatedCost: estimatedCost.toFixed(2),
      monthlySavings: monthlySavings.toFixed(2),
      panelQuantity,
      paybackYears,
      savings25Years
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4 sm:p-8 relative overflow-hidden">
      {/* Animação de Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>
          ))}
        </div>
      )}

      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-orange-50 to-green-50 -z-10" />
      
      <Logo />
      
      <div className="text-center max-w-3xl bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-yellow-200">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-full">
            <Sun className="w-16 h-16 text-white animate-spin" style={{ animationDuration: '10s' }} />
          </div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
          Bem-vindo ao Futuro da Energia! 🎉
        </h1>
        
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 mb-6 border-2 border-yellow-300">
          <p className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-600" />
            Frase Motivacional
            <Sparkles className="w-6 h-6 text-yellow-600" />
          </p>
          <p className="text-lg text-gray-700 italic">
            "{randomQuote}"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <p className="font-bold text-gray-800">Economia Real</p>
            <p className="text-sm text-gray-600">Reduza até 95% da conta</p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-4">
            <Zap className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <p className="font-bold text-gray-800">Energia Limpa</p>
            <p className="text-sm text-gray-600">100% renovável</p>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4">
            <Award className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <p className="font-bold text-gray-800">Valorização</p>
            <p className="text-sm text-gray-600">Imóvel valoriza até 30%</p>
          </div>
        </div>

        <p className="text-lg text-gray-700 mb-6">
          Você está a poucos passos de transformar sua casa em uma usina de energia limpa e econômica!
        </p>
      </div>

      {/* Pré-Orçamento */}
      <div className="w-full max-w-2xl bg-white rounded-3xl p-8 shadow-2xl border-2 border-green-200">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Gere Seu Pré-Orçamento Agora!
        </h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="monthlyBill" className="block text-sm font-medium mb-2 text-gray-700">
              Valor médio da sua conta de energia (R$)
            </label>
            <input
              id="monthlyBill"
              type="number"
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Ex: 350"
              required
            />
          </div>
          <button
            onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Gerar Pré-Orçamento ⚡
          </button>
        </div>

        {budget && (
          <div className="mt-8 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-300 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <Sun className="w-6 h-6" />
              Seu Pré-Orçamento Solar
            </h3>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <p className="text-sm text-gray-600">Geração necessária</p>
                <p className="text-2xl font-bold text-gray-800">{budget.requiredGeneration} kWh/mês</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md">
                <p className="text-sm text-gray-600">Investimento estimado</p>
                <p className="text-2xl font-bold text-blue-600">R$ {budget.estimatedCost}</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md">
                <p className="text-sm text-gray-600">Economia mensal</p>
                <p className="text-2xl font-bold text-green-600">R$ {budget.monthlySavings}</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md">
                <p className="text-sm text-gray-600">Quantidade de placas solares</p>
                <p className="text-2xl font-bold text-gray-800">{budget.panelQuantity} placas</p>
              </div>
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-4 shadow-md border-2 border-yellow-300">
                <p className="text-sm text-gray-600">Retorno do investimento</p>
                <p className="text-2xl font-bold text-orange-600">{budget.paybackYears} anos</p>
              </div>
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4 shadow-md border-2 border-green-300">
                <p className="text-sm text-gray-600">Economia em 25 anos</p>
                <p className="text-2xl font-bold text-green-700">R$ {budget.savings25Years}</p>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <button
                onClick={() => router.push('/kit')}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-6 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Personalizar Meu Kit Solar
              </button>
              <button
                onClick={() => router.push('/')}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-xl font-bold transition-all"
              >
                Voltar ao Início
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      {!budget && (
        <div className="text-center max-w-2xl">
          <p className="text-gray-600 text-lg">
            💡 <strong>Dica:</strong> Quanto maior sua conta de energia, maior será sua economia com energia solar!
          </p>
        </div>
      )}
    </div>
  );
}
