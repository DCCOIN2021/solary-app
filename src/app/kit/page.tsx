'use client'

import { useState, useEffect } from 'react';
import { Logo } from '@/components/Logo';
import { useRouter } from 'next/navigation';

interface PanelType {
  id: number;
  name: string;
}

interface InverterType {
  id: number;
  name: string;
}

interface MicroInverterType {
  id: number;
  name: string;
}

export default function KitConfiguration() {
  const [operator, setOperator] = useState('');
  const [otherOperator, setOtherOperator] = useState('');
  const [panelType, setPanelType] = useState('');
  const [captureCapacity, setCaptureCapacity] = useState('');
  const [microInverter, setMicroInverter] = useState('');
  const [inverter, setInverter] = useState('');
  const [inverterModel, setInverterModel] = useState('');
  const [kitGenerated, setKitGenerated] = useState(null);
  const [panelTypes, setPanelTypes] = useState<PanelType[]>([]);
  const [inverterTypes, setInverterTypes] = useState<InverterType[]>([]);
  const [microInverterTypes, setMicroInverterTypes] = useState<MicroInverterType[]>([]);
  const router = useRouter();

  useEffect(() => {
    loadPanelTypes();
    loadInverterTypes();
    loadMicroInverterTypes();
  }, []);

  const loadPanelTypes = async () => {
    try {
      const response = await fetch('/api/panel-types');
      if (response.ok) {
        const data = await response.json();
        setPanelTypes(data);
      }
    } catch (error) {
      console.error('Erro ao carregar tipos de placa:', error);
    }
  };

  const loadInverterTypes = async () => {
    try {
      const response = await fetch('/api/inverter-types');
      if (response.ok) {
        const data = await response.json();
        setInverterTypes(data);
      }
    } catch (error) {
      console.error('Erro ao carregar tipos de inversor:', error);
    }
  };

  const loadMicroInverterTypes = async () => {
    try {
      const response = await fetch('/api/micro-inverter-types');
      if (response.ok) {
        const data = await response.json();
        setMicroInverterTypes(data);
      }
    } catch (error) {
      console.error('Erro ao carregar tipos de micro inversor:', error);
    }
  };

  const handleGenerateKit = () => {
    const kit = {
      operator: operator === 'other' ? otherOperator : operator,
      panelType,
      captureCapacity,
      microInverter,
      inverter,
      inverterModel
    };
    setKitGenerated(kit);
    // Após gerar o kit, redirecionar para a página de login
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4 sm:p-8">
      <Logo />
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Configure Seu Kit Solar
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8">
          Personalize os componentes do seu sistema de energia solar
        </p>
      </div>

      <div className="w-full max-w-md space-y-4">
        <div>
          <label htmlFor="operator" className="block text-sm font-medium mb-2">
            Qual sua operadora de energia elétrica?
          </label>
          <select
            id="operator"
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
            className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          >
            <option value="">Selecione...</option>
            <option value="Enel">Enel</option>
            <option value="Light">Light</option>
            <option value="other">Outros</option>
          </select>
          {operator === 'other' && (
            <input
              type="text"
              value={otherOperator}
              onChange={(e) => setOtherOperator(e.target.value)}
              className="w-full mt-2 px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Digite o nome da operadora"
              required
            />
          )}
        </div>

        <div>
          <label htmlFor="panelType" className="block text-sm font-medium mb-2">
            Tipo de placa solar
          </label>
          <select
            id="panelType"
            value={panelType}
            onChange={(e) => setPanelType(e.target.value)}
            className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          >
            <option value="">Selecione...</option>
            {panelTypes.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="captureCapacity" className="block text-sm font-medium mb-2">
            Capacidade de captação (Wp)
          </label>
          <input
            id="captureCapacity"
            type="number"
            value={captureCapacity}
            onChange={(e) => setCaptureCapacity(e.target.value)}
            className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Ex: 400"
            required
          />
        </div>

        <div>
          <label htmlFor="microInverter" className="block text-sm font-medium mb-2">
            Micro inversor
          </label>
          <select
            id="microInverter"
            value={microInverter}
            onChange={(e) => setMicroInverter(e.target.value)}
            className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Selecione...</option>
            {microInverterTypes.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="inverter" className="block text-sm font-medium mb-2">
            Inversor
          </label>
          <select
            id="inverter"
            value={inverter}
            onChange={(e) => setInverter(e.target.value)}
            className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Selecione...</option>
            {inverterTypes.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="inverterModel" className="block text-sm font-medium mb-2">
            Modelo do inversor ou micro inversor
          </label>
          <input
            id="inverterModel"
            type="text"
            value={inverterModel}
            onChange={(e) => setInverterModel(e.target.value)}
            className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Ex: SMA Sunny Tripower, Fronius Primo"
          />
        </div>

        <button
          onClick={handleGenerateKit}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          Gerar Kit
        </button>
      </div>

      {kitGenerated && (
        <div className="w-full max-w-md bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">✅ Seu Kit Solar Foi Criado!</h2>
          <div className="space-y-2 text-blue-700 mb-4">
            <p><strong>Operadora:</strong> {kitGenerated.operator}</p>
            <p><strong>Tipo de placa solar:</strong> {kitGenerated.panelType}</p>
            <p><strong>Capacidade de captação:</strong> {kitGenerated.captureCapacity} Wp</p>
            <p><strong>Micro inversor:</strong> {kitGenerated.microInverter || 'Não especificado'}</p>
            <p><strong>Inversor:</strong> {kitGenerated.inverter || 'Não especificado'}</p>
            <p><strong>Modelo:</strong> {kitGenerated.inverterModel || 'Não especificado'}</p>
          </div>
          <p className="text-sm text-blue-600 text-center animate-pulse">
            Redirecionando para o login...
          </p>
        </div>
      )}
    </div>
  );
}
